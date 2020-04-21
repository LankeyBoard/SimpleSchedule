import React from 'react';
import logo1 from "./../images/Ostrich-big.png"
import logo2 from "./../images/Astronaut-big.png"
import logo3 from "./../images/BoatLeak-big.png"
import logo4 from "./../images/Ghost-big.png"
import logo5 from "./../images/IceCreamSpill-big.png"
import logo6 from "./../images/LostTourist-big.png"

const imageCollection = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6
]

const imageCollectionSize = imageCollection.length

const NotFoundPage = () => {
    const randomInt = Math.floor(Math.random()*imageCollectionSize)
    const randomImage = imageCollection[randomInt]
    return <div id="pageNotFound" className="flexbox-wrapper vertical flexbox-centered">
    <div>
        <div id="pageNotFound-img-wrapper">
            <img src={randomImage} alt="404 Image"/>
        </div>
        <h1>404: Page Not Found</h1>
    </div>
</div>
}

export default NotFoundPage;