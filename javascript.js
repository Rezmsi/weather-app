/* ----------------------------- get dom elements ------------------------------------ */
let inputCity = document.querySelector('.search-box')
let container = document.querySelector('.detail-container')
let footer = document.querySelector('.footer')
let btn = document.querySelector('.show-weather')

/* ----------------------------- get datas whith API ------------------------------------ */
inputCity.addEventListener('keydown',(event)=>{
    if(event.Keycode===13){
        getWeather()
    }
})
btn.addEventListener('click',getWeather)

function getWeather (){
    removeVisibleClass()
    container.innerHTML=''
    
    let todayis = new Date().getDate()
    let monthis = new Date().getMonth()
    let yearis = new Date().getFullYear()

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=b7b88f4af60ebe991c53b0059cd617e2`)
        .then(res => {return res.json()})
        .then( (data) => {

            
            container.insertAdjacentHTML('afterbegin',
                `
                <section class="location">
                <div class="city"> ${data.name} </div>
                <div class="date"> ${yearis} / ${monthis} / ${todayis} </div>
                </section>
                <div class="current">
                <div class="temp">${Math.floor((data.main.temp)-273.15)}<span>°c</span></div>
                <div class="weather">${data.weather[0].main}</div>
                <div class="hi-low"> Humidity ${data.main.humidity} </div>
                </div>
                `
            )
        })
        .catch(res => {
            footer.classList.add('visible')
            container.innerHTML=''
            footer.innerHTML=''
            footer.insertAdjacentHTML('beforeend',
                `
                <p> city not found !!! </p>
                `
            )
        })
}

function removeVisibleClass (){
    footer.classList.remove('visible')
}

