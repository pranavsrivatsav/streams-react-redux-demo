import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchStream, deleteStream } from '../../actions'
import Modal from '../Modal'
import history from '../../history'

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions() {
        const { id } = this.props.match.params
        return (
            <React.Fragment>
                <Link to="/">
                    <div className="ui red inverted button">
                        <i className="remove icon"></i>
                    Cancel
                    </div>
                </Link>
                <div className="ui green inverted button" onClick={() => this.props.deleteStream(this.props.match.params.id)}>
                    <i className="trash alternate outline icon"></i>
                Delete
            </div>
            </React.Fragment>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete the stream?'
        }
        return `Are you sure you want to delete the stream with the title - ${this.props.stream.title}?`
    }

    onDismiss = () => history.push('/')

    render() {
        return (
            <Modal
                title='Delete stream'
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={this.onDismiss}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)