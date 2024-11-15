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
                for(place of destination){
                    var placeContainer = document.createElement('div');
                    var nameElement = document.createElement('h2');
    
                    nameElement.innerHTML = place.name;
    
                    placeContainer.appendChild(nameElement);
                    resultsElement.appendChild(placeContainer);
                }
            }else{
                for(place of destination){
                    var placeContainer = document.createElement('div');
                    var nameElement = document.createElement('h2');
                    var descriptionElement = document.createElement('p');
    
                    nameElement.innerHTML = place.name;
                    descriptionElement.innerHTML = place.description;
    
                    placeContainer.appendChild(nameElement);
                    placeContainer.appendChild(descriptionElement);
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

searchBtn.addEventListener('click', searchDestination);