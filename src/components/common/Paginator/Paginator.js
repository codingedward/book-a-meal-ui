import React from 'react';
import { Button } from 'reactstrap';

class Paginator extends React.Component {

    render() {
        const pageInfo = this.props.pageInfo || {};
        return (
            <div>
                <p className="text-center pt-0 mt-0 text-bottom">Showing page {pageInfo.currentPage} of {pageInfo.pageCount}</p>
                <div className="pt-1">
                    <Button 
                        disabled={!pageInfo.hasNext} 
                        onClick={() => this.props.onNext(pageInfo.nextPage)} 
                        className="btn btn-secondary float-right">Next </Button>
                    <Button 
                        disabled={!pageInfo.hasPrev} 
                        onClick={() => this.props.onPrev(pageInfo.prevPage)} 
                        className="btn btn-secondary"> Previous</Button>
                </div>
            </div>

        );
    }
}

export default Paginator;
