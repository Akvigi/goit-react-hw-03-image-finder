import { Component } from "react";
import styles from "./Gallery.module.css"
class Gallery extends Component {
    render() {
        const { array } = this.props
        return (
            <ul className={styles.ImageGallery}>{array.length > 0 && array.map(({id, webformatURL, largeImageURL, tags, likes}) => <li className={styles.ImageGalleryItem} key={`${id}${likes}`}><img className={styles.Image} src={webformatURL} alt={tags}/></li>) }</ul>
        );
    }
}

export default Gallery;