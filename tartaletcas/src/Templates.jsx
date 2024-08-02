import './Templates.css'
import plus from './assets/plus.svg'
function Template() {
    return (
        <div className='container-for-template'> 
                <h2 className='template-name'>For Fun</h2>
                <div className='template-dishes'>
                <div className='template-dish-container'>
                    <h3>tartaletca</h3>
                    <h3>5</h3>
                </div>
                <div className='template-dish-container'>
                    <h3>tartaletca</h3>
                    <h3>5</h3>
                </div>
                <div className='template-dish-container'>
                    <h3>tartaletca</h3>
                    <h3>5</h3>
                </div>
                <div className='template-dish-container'>
                    <h3>tartaletca</h3>
                    <h3>5</h3>
                </div>
                <div className='template-dish-container'>
                    <h3>tartaletca</h3>
                    <h3>5</h3>
                </div>
                <div className='template-dish-container'>
                    <h3>tartaletca</h3>
                    <h3>5</h3>
                </div>
                <div className='template-dish-container'>
                    <h3>tartaletca</h3>
                    <h3>5</h3>
                </div>
                <div className='template-dish-container'>
                    <h3>tartaletca</h3>
                    <h3>5</h3>
                </div>
                <div className='template-dish-container'>
                    <h3>tartaletca</h3>
                    <h3>5</h3>
                </div>
                <div className='template-dish-container'>
                    <h3>tartaletca</h3>
                    <h3>5</h3>
                </div>
                </div>
                <div className='template-buttons-container'>
                    <button class='template-button'>Edit</button>
                    <button class='template-button'>Start</button>
                </div>
        </div>
    );
}


function Templates(props) {
    return (
        <>
        <div className='above-part-templates'>
        <h1>Templates</h1>
        <button class='add-button'><img src={plus}></img></button>
        </div>
        <div className='templates-grid'>
            <Template/>
            <Template/>
            <Template/>
            <Template/>
        </div>
        </>
    );
}

export default Templates;