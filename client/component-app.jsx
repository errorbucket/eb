var page = require('page');
var React = require('react');
var _ = require('lodash');

var Nav = require('./component-nav.jsx');
var Dashboard = require('./component-dashboard.jsx');
var Report = require('./component-report.jsx');
var Details = require('./component-details.jsx');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            params: {},
            state: {}
        };
    },
    render: function() {
        return <div className='container'>
            <div className='menu'>
                <Nav pathname={ this.props.pathname } />
            </div>
            <div className='content'>
                { this.renderMain() }
                <div className="screen">
                    { this.renderDetails() }
                </div>
            </div>
        </div>;
    },
    renderMain: function() {
        if (_.isEmpty(this.props.params)) {
            return <Dashboard />;
        }

        return <Report type={ this.props.params.type } onClick={ this._showDetails } />;
    },
    renderDetails: function() {
        var params = this.props.params;
        var detailsType = !_.isEmpty(this.props.params) ? params.type.slice(0, -1) : null;

        if (params.id) {
            var title = this.props.state.details ? this.props.state.details : params.id;
            return <Details
                type={ detailsType }
                id={ params.id }
                title={ title }
                onClose={ this._hideDetails } />;
        }
    },
    _showDetails: function(data) {
        var url = '/' + this.props.params.type + '/page' + this.props.params.page + '/' + encodeURIComponent(data.key) + '/';
        page.show(url, {details: data.title});
    },
    _hideDetails: function() {
        page.show('/' + this.props.params.type + '/page' + this.props.params.page + '/');
    }
});
