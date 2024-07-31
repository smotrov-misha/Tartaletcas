import './Info.css'

function Info(props) {
    return (
        <div className="overlay">
        <div className='container'>
            <h2 className='menu-name'>{props.itemName}</h2>
            <h3 className='title'>Dishes</h3>
            <hr className='dividing-line'/>
            <div>
                {props.dishes.map(dish => (<div key = {dish.id} className='dish'>
                    <h3>{dish.Product}</h3>
                    <h3>{dish.howMany}</h3>
                </div>))}
            </div>
            <hr className='dividing-line' id='bottom-dividing-line'/>
            <h3 className='title'>Description</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nunc mattis lacus dui, a semper nibh accumsan id. Pellentesque ullamcorper 
                euismod neque sed eleifend. Nullam a blandit tortor. Sed convallis sit amet 
                arcu sed tempor.</p>
            <h3 className='title'>Notes</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nunc mattis lacus dui, a semper nibh accumsan id. Pellentesque ullamcorper 
                euismod neque sed eleifend. Nullam a blandit tortor. Sed convallis sit amet 
                arcu sed tempor.</p>
            <div className='deadline-container'>
                <h3 className='title'>Deadline</h3>
                <p className='deadline-date'>14/88/1984</p>
            </div>
        </div>
        </div>
    );
}

export default Info