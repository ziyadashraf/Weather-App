//setting date
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

const apiKey = '26d1aed124414fbb806553142f3333dd&units=metric';
const URL =`https://api.openweathermap.org/data/2.5/weather?zip=`;
const countryCode =',us&appid=';


//function to post the data
const postData = async(url = '', data ={}) => {
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify(data)
    });

    try {

        const newData = await res.json();
        console.log(newData);
        return newData;

      }catch(error) {
      console.log("error", error);
      document.getElementById('temp').innerHTML = error;
      }
}



const getJournal = async (zip) => {

    const res = await fetch(URL+zip+countryCode+apiKey); //fetching full URL
  
    try{
      
      let data = await res.json();
      console.log(data);
      return data;
  
    } catch (error) {
      
      console.log('error', error);
      
    }
  
}

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  let feels = document.getElementById('feelings').value;
  let zip = document.getElementById('zip').value;
  getJournal(zip)

  .then(function(data){
    console.log(data);

    if(data.cod === '404' || data.cod === '400'){ //Displaying error if the zip code entered is invalid
      document.getElementById('error').innerHTML = 'City not found, enter valid zip code!';
    }else{
      document.getElementById('error').innerHTML = '';
    }

    postData('/addData', {weather: data.main.temp, date: newDate, input: feels});
  })

  
  .then( ()=>{ updateUI(); }) //Sending a post request to save the data first and then get the saved data.

}

const updateUI = async() => { //Updating the info

  
    const req = await fetch('/all');
  
    try{
  
      let allData = await req.json();
      console.log(allData);
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.weather+ ' C';
      document.getElementById('content').innerHTML = allData.input;
    } catch(error) {
  
      console.log('error', error);
    
    }
  
  }