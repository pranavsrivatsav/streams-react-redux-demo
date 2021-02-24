import React from 'react'
import { connect } from 'react-redux'
import flv from 'flv.js'
import { fetchStream } from '../../actions'

class StreamShow extends React.Component {
    constructor(props) {
        super(props)
        this.videoRef = React.createRef()
    }

    buildPlayer() {
        const { id } = this.props.match.params
        if (this.player || !this.props.stream) return

        this.player = flv.createPlayer({
            type: 'flv',
            url: `ws://localhost:8000/live/${id}.flv`
        })

        this.player.attachMediaElement(this.videoRef.current)
        this.player.load()
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchStream(id)
        this.buildPlayer()
    }

    componentDidUpdate() {
        this.buildPlayer()
    }

    componentWillUnmount() {
        this.player.destroy()
    }

    render() {

        if (!this.props.stream) {
            return <div>LOADING...</div>
        }

        const { title, description } = this.props.stream

        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)