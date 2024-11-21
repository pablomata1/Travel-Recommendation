// const destination = document.getElementById('destination');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');

const keyWords = [
    {country : ['country', 'countries']},
    {beach: ['beach','beaches']},
    {temple: ['temple', 'temples']}
];

//Searches if the word inputed by user matches any variations, returns variation of word found in the json file
function searchVariations(word){
    let found = false;

    for(const key of keyWords){
        //Object.values() returns an array of property values of an object
        //Example: object - {country: ['country', 'countries]'}
        //Returns - [['country', 'countries']] an array with one value which is an array
        let variations = Object.values(key);
        let variationsArray = variations[0]; //Storing array of values from the variations array above.
        
        //using find() method to search if the users input is found in the array
        //using includes() method check if the value for word is found in the array
        found = variationsArray.includes(word);
        console.log(found);

        if(found){
            return variationsArray[1]; //returns the plural word from variations of found word
        }
    }

    if(!found){
        return word;
    }
}

//Simple if else method of searching for variations of words found in json file
//Sets keyWord to a value depending on condition 
//Returns a word to search in the json file.
function getVariationWord(word){
    const keyWord = word; 

    if(word === 'country' || word === 'countries'){
        return 'countries';
    }else if(word === 'beach' || word === 'beaches'){
        return 'beaches';
    }else if(word === 'beach' || word === 'beaches'){
        return 'temples'
    }else{
        return keyWord
    }
}

function searchDestination(){
    const input = document.getElementById('destination').value.toLowerCase();
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '';

    fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {

        const searchWord= searchVariations(input);
        // const searchWord= getVariationWord(input);

        console.log('test: '+searchWord);

        //Data object was turn into an array of keys using Object.keys() method
        //Since data is not an array, the find method can't be used on an object
        //The find method returns the key which matched the users input
        const keyArray = Object.keys(data);
        const key = keyArray.find(key => key.toLowerCase() === searchWord);

        if(key){
            //Using the key we can reference the property the user input
            //object[''] access was used because key is a string
            //if object.property access was used it would return undefined
            //Example: data['property'] vs data.'property' (wouldnt work because of the '')
            const destination = data[key];
            
            if(key === 'countries'){

                //Iterates array of countries
                //creates elements with information from json 
                for(const country of destination){  
                    //itterates array of cities
                    for(const city of country.cities){
                        let placeContainer = document.createElement('div');
                        let nameElement = document.createElement('h2');
                        let descriptionElement = document.createElement('p');
                        let imgElement = document.createElement('img');
                        let buttonElement = document.createElement('button');

                        imgElement.src = `./pictures/${city.imageUrl}`;
                        descriptionElement.innerHTML = city.description;

                        nameElement.innerHTML = city.name;
                        buttonElement.innerHTML = 'Visit';

                        buttonElement.setAttribute('id', 'visit');
                        imgElement.classList.add('thumbnail');
    
                        placeContainer.appendChild(imgElement);
                        placeContainer.appendChild(nameElement);
                        placeContainer.appendChild(descriptionElement);
                        placeContainer.appendChild(buttonElement);
                        resultsElement.appendChild(placeContainer);
                    }

                }
            }else{
                //Iterates thru array of places
                //creates elements with information from json 
                for(place of destination){
                    let placeContainer = document.createElement('div');
                    let nameElement = document.createElement('h2');
                    let descriptionElement = document.createElement('p');
                    let imgElement = document.createElement('img');
                    let buttonElement = document.createElement('button');
    
                    nameElement.innerHTML = place.name;
                    descriptionElement.innerHTML = place.description;
                    imgElement.src = `./pictures/${place.imageUrl}`;
                    buttonElement.innerHTML = 'Visit';
                    
                    buttonElement.setAttribute('id', 'visit');
                    imgElement.classList.add('thumbnail');
                    

                    placeContainer.appendChild(imgElement);
                    placeContainer.appendChild(nameElement);    
                    placeContainer.appendChild(descriptionElement);
                    placeContainer.appendChild(buttonElement);
                    resultsElement.appendChild(placeContainer);
                }
            }
        }else{
            console.log('no matches found');
            let placeContainer = document.createElement('div');
            let messageEle = document.createElement('h4');

            messageEle.innerHTML = 'Destination not found. <br> Try: country, beach, temple.' 

            placeContainer.setAttribute('id','message')

            placeContainer.appendChild(messageEle);    
            resultsElement.appendChild(placeContainer);
        }
    })
    .catch(error=>{
        console.error('Error: ', error);
        console.log('not able to fetch data');
    })
}

function reset(){
    let resultsEle = document.getElementById('results');
    let destinationEle = document.getElementById('destination');

    resultsEle.innerHTML = '';
    destinationEle.value = '';

}

searchBtn.addEventListener('click', searchDestination);
resetBtn.addEventListener('click', reset);