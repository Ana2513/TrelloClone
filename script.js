
const board= document.getElementById('board')
const addList= document.getElementById('addList')

class cList {
    constructor(place, title){

        this.place = place;
        this.title = title;
        this.cardArray = [];

        this.render();
    }

    addCard(){

        this.inputDiv = document.createElement('div');
        this.inputDiv.classList.add('card');
        this.inputDiv.classList.add('input');
        this.inputText = document.createElement('input');
        this.inputText.placeholder = 'Title';
        this.inputDesc = document.createElement('input');
        this.inputDesc.placeholder = 'Description';
        this.inputBtn = document.createElement('button');
        this.inputBtn.innerText = '+';

        this.inputBtn.addEventListener('click', ()=>{
            let text = this.inputText.value
            let desc = this.inputDesc.value
            this.cardArray.push(new classCard(text, desc, this.listCard, this));
            this.inputDiv.remove();
        });

        this.listCard.append(this.inputDiv);
        this.inputDiv.append(this.inputText);
        this.inputDiv.append(this.inputDesc);
        this.inputDiv.append(this.inputBtn);
        
    }

    render(){
        this.createListElement();
        this.place.append(this.listEl);
    }

    createListElement(){
        this.listEl = document.createElement('div');
        this.listEl.classList.add('js-list');
        this.divHeader = document.createElement('div');
        this.divHeader.classList.add('js-list-header');
        this.h1 = document.createElement('h1');
        this.h1.innerText = this.title;
        this.bntAddCard = document.createElement('button');
        this.bntAddCard.innerText = '+';
        this.bntAddCard.classList.add("add-btn");
        this.bntAddCard.id = "bntAddCard";

        this.bntAddCard.addEventListener('click', ()=>{
            this.addCard()
        });

        this.listCard = document.createElement('div');
        this.listCard.classList.add('list');



        this.listEl.append(this.divHeader);
        this.listEl.append(this.listCard );
        this.divHeader.append(this.h1);
        this.divHeader.append(this.bntAddCard);

        this.listCard.addEventListener('dragover', (e)=>{
            e.preventDefault();
            let draggingCard = document.querySelector('.dragging');
            let cardAfterDraggingCard = getCardAfterDraggingCard(this.listCard, e.clientY);
            if(cardAfterDraggingCard){
                
                    cardAfterDraggingCard.parentNode.insertBefore(draggingCard, cardAfterDraggingCard);
            } else{
                this.listCard.appendChild(draggingCard);
            }       
        });
    }
}


class classCard{
    constructor(text, desc, place, cList){

        this.place = place;
        this.list = cList;
        this.text = text;
        this.desc = desc;
        
        this.render();
    }

    render(){
        this.createCardElement()
        this.place.append(this.card);
    }
    
    createCardElement(){
        this.card = document.createElement('div');
        this.card.classList.add("card");
        this.card.draggable = true;
        this.cardHeader = document.createElement('div');
        this.cardHeader.classList.add("card-header");
        this.cardHeaderTitle = document.createElement('span');
        this.cardHeaderTitle.innerText = this.text;
        this.cardHeaderBtn = document.createElement('button');
        this.cardHeaderBtn.innerText = "-";
        this.cardHeaderBtn.classList.add('remove-btn')

        this.cardHeaderBtn.addEventListener('click', ()=>{
            this.deleteCard.call(this);
        });

        this.cardDescription = document.createElement('div');
        this.cardDescription.classList.add('card-description');
        this.cardDescription.innerText = this.desc;
        this.cardTags = document.createElement('div');
        this.cardTags.classList.add("card-tags");
        this.cardTagsBtn = document.createElement('button');
        this.cardTagsBtn.innerText = "+";
        this.cardTagsBtn.classList.add('add-tag-btn');

        this.cardTagsBtn.addEventListener('click', ()=>{
            this.addTag.call(this);
        });

        this.card.append(this.cardHeader)
        this.card.append(this.cardDescription)
        this.card.append(this.cardTags)
        this.cardHeader.append(this.cardHeaderTitle)
        this.cardHeader.append(this.cardHeaderBtn)
        this.cardTags.append(this.cardTagsBtn)

        registerEventsOnCard(this.card);


    }

    deleteCard(){
        this.card.remove();
        let i = this.cList.cardArray.indexOf(this);
        this.cList.cardArray.splice(i,1);
    }

    addTag(){
        this.inputTag = document.createElement('input');
        this.inputTag.classList.add('inputTag');
        this.cardTags.append(this.inputTag);

        this.inputTag.addEventListener("keyup", (e)=>{
            if(e.key === 'Enter'){
                
                e.preventDefault();

                let textTag = this.inputTag.value
                
                this.cardTag = document.createElement('span');
                this.cardTag.innerText= textTag
                this.cardTags.append(this.cardTag)
                this.inputTag.remove();


            }
        });
    }

}

function registerEventsOnCard(card){
    card.addEventListener('dragstart', (e)=>{
        card.classList.add('dragging');
    });


    card.addEventListener('dragend', (e)=>{
        card.classList.remove('dragging');
    });
}

//Essa function eu acabei pegando desse video https://youtu.be/EqHwUsdOg8o
function getCardAfterDraggingCard(list, yDraggingCard){

    let listCards = [...list.querySelectorAll('.card:not(.dragging)')];

    return listCards.reduce((closestCard, nextCard)=>{
        let nextCardRect = nextCard.getBoundingClientRect();
        let offset = yDraggingCard - nextCardRect.top - nextCardRect.height /2;

        if(offset < 0 && offset > closestCard.offset){
            return {offset, element: nextCard}
        } else{
            return closestCard;
        }
    
    }, {offset: Number.NEGATIVE_INFINITY}).element;

}

let list1 = new cList(board,'To Do');
let list2 = new cList(board,'Doing');
let list3 = new cList(board,'Done');

