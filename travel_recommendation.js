// const destination = document.getElementById('destination');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsElement = document.getElementById('results');


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
        
        //using includes() method check if the value for word is found in the array
        found = variationsArray.includes(word);
        console.log(found);

        if(found){
            return variationsArray[1]; //returns the plural word from variations of found word
        }
    }

    if(!found){
        return word; //if not found returns user input orginal word
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

//Displays info 
//Creates elements and adds them to HTML file
function displayInfo(place){
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

//Searches for destination information searched by the user
function searchDestination(){
    var input = document.getElementById('destination').value.toLowerCase();
    resultsElement.innerHTML = '';

    if(input){
        //fetching file travel json info
        fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {

            const searchWord= searchVariations(input);
            // const searchWord= getVariationWord(input);

            console.log('word: '+searchWord);

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
                            displayInfo(city);
                        }
                    }
                }else{
                    //displays temples or beaches
                    //Iterates thru array of places
                    for(place of destination){
                        displayInfo(place);
                    }
                }
            }else{
                var citiesArray=[];
                data.countries.forEach(country => {
                    const cities= country.cities.filter(city => city.name.toLowerCase().includes(searchWord));
                    citiesArray = citiesArray.concat(cities); // adds array values from cities
                });

                //if there is no results from the arrray display message
                if(citiesArray.length ===0){
                    console.log('no matches found');
                    let placeContainer = document.createElement('div');
                    let messageEle = document.createElement('h4');

                    messageEle.innerHTML = 'Destination not found. <br> Try: country, beach, temple.' 

                    placeContainer.setAttribute('id','message')

                    placeContainer.appendChild(messageEle);    
                    resultsElement.appendChild(placeContainer);
                }else{
                    //else display results from the array
                    for(city of citiesArray){
                        displayInfo(city);
                     }
                }
            }
        })
        .catch(error=>{
            console.error('Error: ', error);
            console.log('not able to fetch data');
        })
    }else{
        let userInput = document.getElementById('destination');
        alert('Please enter a destination')
        userInput.focus();
    }
}

//resets input values and search results
function reset(){
    let resultsEle = document.getElementById('results');
    let destinationEle = document.getElementById('destination');

    resultsEle.innerHTML = '';
    destinationEle.value = '';

}

searchBtn.addEventListener('click', searchDestination);
resetBtn.addEventListener('click', reset);