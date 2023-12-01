export const whosThatPokemon = {
    data: {},
    delay: 800,
    toLower: (value) => String(value).toLowerCase(),
    clear () {
        const {inputRef} = this.data;
        inputRef.current.value = "";
    },
    fadein () {
        const {spriteRef} = this.data;
        spriteRef.current.style.opacity = "1";
        spriteRef.current.style.transition = "opacity 200ms";
    },
    fadeout () {
        const {spriteRef} = this.data;
        spriteRef.current.style.opacity = "0";
        spriteRef.current.style.transition = "opacity 400ms";
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
        const {inputRef} = this.data;
        const parent = inputRef.current.closest('#shaking');
        const message = parent.querySelector('#message');
        parent.classList.add('shaking--show');
        message.style.visibility = 'visible';
        
        setTimeout(() => {
            parent.classList.remove('shaking--show');
            message.style.visibility = 'hidden';
        }, this.delay);
    },
    start (callback) {
        const {pokemon, inputRef, spriteRef} = this.data;
        const {name} = pokemon;
        const {value} = inputRef.current;

        if(value === "") return false;

        if(name === this.toLower(value)) {
            spriteRef.current.classList.add('s-whos-that-pokemon__image--show');
            this.clear();
            
            this.isCorrect(() => {
                spriteRef.current.classList.remove('s-whos-that-pokemon__image--show');
                callback();
            })
        } else {
            this.isIncorrect();
            this.clear();
        }
    }
};