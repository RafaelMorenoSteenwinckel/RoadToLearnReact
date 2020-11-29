import React, {Component} from 'react';

class ExplainBindingComponent extends Component {

    constructor(props) {
        super(props);

        //Donc dans le but de rendre accessible this dans vos méthodes de classe, vous devez lier les méthodes de classe avec this.
        this.onClickMeBinded = this.onClickMeBinded.bind(this);
    }

    onClickMeNoBinded() {
        console.log(this);
    }

    onClickMeBinded() {
        console.log(this);
    }

    onclickMeArrowFunction = () => {
        console.log (this);
    }

    render() {
        function onClickMe() {
            console.log ("Fonction onClickMe dans la fonction render()");
        }

        return (
        <>
            <button onClick={onClickMe}>Methode onClickMe inside render ()</button><br />
            <button onClick={this.onClickMeNoBinded}>Methode this.onClickMe mais non bindée dnas le constructor (undefined)</button><br />
            <button onClick={this.onClickMeBinded}>Methode onClickMe binded dans le constructor</button><br />
            <button onClick={this.onclickMeArrowFunction}>Methode onClickMe en arrow function pas besoin de binder quoi que ce soit dans le constructeur</button><br />
            <hr />

            <button onClick={console.log("Exécuté directement et pas au click :/")}>Le on click est executé directement</button><br />
            <button onClick={() =>console.log("Executé au click ! et pas directement au load...")}>Le on click est executé au click car c'est une fonction</button><br />
            <hr />
        </>
        )
    }
}

export default ExplainBindingComponent;

