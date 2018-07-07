import React from 'react';
import './styles.css';

class ImageInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 1,
            fileName: '',
            fileSize: '',
            fileModified: '',
        }
        this.canvasRef = React.createRef();
        this.containerRef = React.createRef();
        this.fileInputRef = React.createRef();
    }

    onRemove = (e) => {
        const { imageSelected } = this.state;
        this.setState({
            ...this.state,
            fileName: '',
            fileSize: '',
            fileModified: '',
            imageSelected: false,
            prefillRemoved: (imageSelected) ? false : true
        });
        this.fileInputRef.current.value = '';
    }

    onSelectImage = (e) => {
        this.fileInputRef.current.click();
    }

    onFileChange = (e) => {

        const files = e.target.files
        if (!files.length) {
            return
        }

        const {
            size,
            fileName,
            fileSize,
            fileModified
        } = this.state;

        if (files[0].size <= 0 || files[0].size > size * 1024 * 1024) {

            this.setState({
                ...this.state,
                error: 'Image file is too large. Please select a smaller image'
            });
            return
        }

        // if not unique file return
        if (files[0].name === fileName && files[0].size === fileSize &&
            fileModified === files[0].lastModified) {
            return
        }

        // ensure received file is image
        if (files[0].type.substr(0, 6) !== 'image/') {
            return
        }

        this.setState({
            ...this.state,
            file: files[0],
            fileName: files[0].name,
            fileSize: files[0].size,
            fileModified: files[0].lastModified,
            fileType: files[0].type,
            imageSelected: true,
        });

        this.loadImage(files[0]);
    }


    loadImage = (file) => {

        const reader = new FileReader()
        reader.onload = (e) => {
            let image = new Image();
            image.onload = () => {
                this.drawImage(image)
            }
            image.src = e.target.result;
        }
        reader.readAsDataURL(file)
    }

    drawImage = (image) => {

        const width = 500;
        const height = 500;
        let previewRatio = width / height

        const imageRatio = image.width / image.height
        const containerWidth = this.containerRef.current.clientWidth
        const previewWidth = Math.min(containerWidth, width)
        const previewHeight = previewWidth / previewRatio

        const pixelRatio = Math.round(window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI)

        let offsetX = 0
        let offsetY = 0
        let scaledWidth = previewWidth
        let scaledHeight = previewHeight
        previewRatio = previewWidth / previewHeight

        // crop the image 
        if (imageRatio >= previewRatio) {
            scaledWidth = scaledHeight * imageRatio;
            offsetX = (previewWidth - scaledWidth) / 2;
        } else {
            scaledHeight = scaledWidth / imageRatio;
            offsetY = (previewHeight - scaledHeight) / 2;
        }

        const canvas = this.canvasRef.current
        const context = canvas.getContext('2d')
        canvas.style.background = 'none'
        canvas.width = previewWidth * pixelRatio
        canvas.height = previewHeight * pixelRatio
        context.setTransform(1, 0, 0, 1, 0, 0)
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(image,
            offsetX * pixelRatio,
            offsetY * pixelRatio,
            scaledWidth * pixelRatio,
            scaledHeight * pixelRatio)
    }

    render() {

        const { prefill } = this.props;
        const { imageSelected, prefillRemoved } = this.state;

        const showPrompt = (! this.state.imageSelected)

        let content = null;
        const buttons = (
            <div className="d-flex justify-content-center">
                <button onClick={this.onSelectImage} className="btn btn-secondary change m-3">Change</button>
                <button onClick={this.onRemove} className="btn btn-danger remove m-3">Remove</button>
            </div>
        );

        if (imageSelected) {
            content = (
                <div>
                    <canvas ref={this.canvasRef} onClick={this.onSelectImage} className="preview"></canvas>
                    <div className="hint">
                        <small><i>(Tap image to edit)</i></small>
                    </div>
                    {buttons}
                </div>
            );
        } else if (prefill && !prefillRemoved) {
            content = (
                <div>
                    <img className="preview" src={prefill}/>
                    {buttons}
                </div>
            );
        } else {
            content = (
                <div className="prompt" onClick={this.onSelectImage}>
                    <div className="inner">
                        Click to select image from your files.
                    </div>
                </div>
            );
        }

        return (
            <div ref={this.containerRef}>
                <input ref={this.fileInputRef} onChange={this.onFileChange} type="file" className="d-none" />
                {content}
            </div>
        );
    }


}

export default ImageInput;
