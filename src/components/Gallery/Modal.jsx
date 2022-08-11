import React, { Component } from "react";
import { createPortal } from "react-dom";
import styles from './Gallery.module.css'
import PropTypes from 'prop-types'
const modal = document.querySelector('#modal')

class Modal extends Component {

    static propTypes = {
        src: PropTypes.string,
        alt: PropTypes.string,
        unshowModal: PropTypes.func,
    }


    componentDidMount() {
        window.addEventListener("keydown", this.handleKeydown)
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeydown)
    }
    
    handleKeydown = (e) => {
        if (e.code === `Escape`) {
            this.props.unshowModal()
        }
    }
    
    onBackClick = e => {
        if (e.currentTarget === e.target) {
            this.props.unshowModal()
        }
    }

    render() {
        const {src, alt} = this.props
        return createPortal(
            <div className={styles.Overlay} onClick = {this.onBackClick}>
                <div className={styles.Modal}>
                    <img src={src} alt={alt} />
                </div>
            </div>, modal   
        );
    }
}

export default Modal;