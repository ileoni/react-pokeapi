export const whosThatPokemon = {
    data: {
        pokemon: null,
        input: null,
        image: null
    },
    delay: 800,
    toLower: (value) => String(value).toLowerCase(),
    clear () {
        const {input} = this.data;
        input.current.value = "";
    },
    fadein () {
        const {image} = this.data;
        image.current.style.opacity = "1";
        image.current.style.transition = "opacity 200ms";
    },
    fadeout () {
        const {image} = this.data;
        image.current.style.opacity = "0";
        image.current.style.transition = "opacity 400ms";
    },
    isCorrect(callback) {
        let counter = 0;
        const intervalHandler = () => {
            switch (counter) {
                case 0: 
                    this.fadein();
                    break;
                case 1: 
                    this.fadeout();
                    break;
                case 2: 
                    callback();
                    break;
                default:
                    this.fadein();
                    clearInterval(timer);
                    break;
            }
            counter++;
        } 
        
        let timer = setInterval(intervalHandler, this.delay);
    },
    isIncorrect() {
        const {input} = this.data;
        const parent = input.current.closest('#shaking');
        const message = parent.querySelector('#message');
        parent.classList.add('shaking--show');
        message.style.visibility = 'visible';
        
        setTimeout(() => {
            parent.classList.remove('shaking--show');
            message.style.visibility = 'hidden';
        }, this.delay);
    },
    start (callback) {
        const {pokemon, input, image} = this.data;
        const {name} = pokemon;
        const {value} = input.current;

        if(value === "") return false;

        if(name === this.toLower(value)) {
            image.current.classList.add('s-whos-that-pokemon__image--show');
            this.clear();
            
            this.isCorrect(() => {
                image.current.classList.remove('s-whos-that-pokemon__image--show');
                callback();
            })
        } else {
            this.isIncorrect();
            this.clear();
        }
    }
};