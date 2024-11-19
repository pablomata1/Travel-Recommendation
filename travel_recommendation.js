// const destination = document.getElementById('destination');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');

function searchDestination(){
    const input = document.getElementById('destination').value.toLowerCase();
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '';

    fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        //Data object was turn into an array of keys using Object.keys() method
        //Since data is not an array, the find method can't be used on an object
        //The find method returns the key which matched the users input
        const keyArray = Object.keys(data);
        const key = keyArray.find(key => key.toLowerCase() === input);
    
        if(key){
            //Using the key we can reference the property the user input
            //object[''] access was used because key is a string
            //if object.property access was used it would return undefined
            //Example: data['property'] vs data.'property' (wouldnt work because of the '')
            const destination = data[key];
            console.log(destination);

            if(key === 'countries'){

                //Iterates array of countries
                //creates elements with information from json 
                for(country of destination){  
                    //itterates array of cities
                    for(city of country.cities){
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
                    var placeContainer = document.createElement('div');
                    var nameElement = document.createElement('h2');
                    var descriptionElement = document.createElement('p');
                    var imgElement = document.createElement('img');
                    var buttonElement = document.createElement('button');
    
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