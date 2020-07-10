import React from "react";
import PropTypes from "prop-types";
import "@mikhailfarberov/react-org-chart/dist/styles.css";

var defaultProps = {
    tree: {},
    collapse: false,
    ids: {},
    roots: {},
    next: {},
    visibleCaptions: {},
    collapsedItems: {},
    collapsedParents: null
}

class OrgChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...defaultProps}
    }

    static getDerivedStateFromProps(props, prevState) {
        if (prevState.tree !== props.tree) {
            prevState.tree = props.tree
            prevState.ids = OrgChart.getItemIds(prevState.tree)
            prevState.roots = OrgChart.getRoots(prevState.tree)
            prevState.next = OrgChart.getItemNext(prevState.tree)
            if (!props.collapse) {
                prevState.visibleCaptions = {...prevState.ids}
            }
            
            if (prevState.collapsedParents === null) {
                if (props.collapse) {
                    prevState.collapsedParents = {...prevState.roots}
                    prevState.collapsedItems = {}
                    for (let parent_id in prevState.collapsedParents) {
                        for (var child_id in prevState.ids[parent_id]) {
                            prevState.collapsedItems[child_id] = true;
                        }
                    }
                }
            } else {
                prevState.collapsedParents = {}
                for (let id in prevState.ids) {
                    if (prevState.roots[id] !== undefined || prevState.collapsedItems[id] !== undefined || Object.keys(prevState.ids[id]).length) continue;
                    prevState.collapsedParents[id] = true;
                }
                
            }
            return prevState
        }
        return null
    }

    static getItemIds(items) {
        let ids = {}
        items.map((item) => {
            if (item['children'] !== undefined && item['children'] !== null) {
                let childs = this.getItemIds(item['children'])
                ids[item['id']] = childs
                ids = {...ids, ...childs}
            } else 
                ids[item['id']] = {}
            return true
        })
        return ids
    }

    static getItemNext(items) {
        let next = {}
        items.map((item) => {
            next[item['id']] = []
            if (item['children'] !== undefined && item['children'] !== null) {
                let childs = this.getItemNext(item['children'])
                for (let child of item['children']) {
                    next[item['id']].push(child['id']);
                }
                next = {...next, ...childs}
            }
            return true
        })
        return next
    }

    static getRoots(items) {
        let roots = {}
        items.map((item) => {
            roots[item['id']] = true
            return true
        })
        return roots
    }

    collapseItem(e, item) {
        this.setState(prevState => { 
            let id = item['id'];
            let items = prevState.collapsedItems;
            let parents = prevState.collapsedParents;
            if (parents[id] == undefined) {
                for (var child_id in prevState.ids[id]) {
                    items[child_id] = true;
                }
                parents[id] = true;
            } else {
                for (let child_id of prevState.next[id]) {
                    if (items[child_id] !== undefined)
                        delete items[child_id];

                    parents[child_id] = true;
                }
                delete parents[id];
                if (this.props.onExpandItem !== undefined)
                    this.props.onExpandItem(item)
            }
            return {'collapsedItems': items, 'colapsedParents': parents}
        })
    }

    collapseCaption(e, id) {
        e.stopPropagation();
        this.setState(prevState => { 
            let visible = prevState.visibleCaptions
            if (visible[id] === undefined)
                visible[id] = true
            else
                delete visible[id]
            return {'visibleCaptions': visible}
        })
    }

    renderItem(item) {
        let linkText = ''
        if (typeof item['link'] == 'object') {
            if (typeof item['link']['image'] !== 'undefined')
                linkText = (<img src={item['link']['image']} alt=""></img>)
            else if (typeof item['link']['text'] !== 'undefined')
                linkText = item['link']['text']
        }
        
        return (this.state.collapsedItems[item['id']] === undefined) ? (
            <div className="item tf-nc" onClick={e => this.collapseItem(e, item)}>
                {(typeof item['descr'] !== 'undefined' && item['descr']) ? (<i className="resize" onClick={e => this.collapseCaption(e, item.id)}></i>):null}
                {(typeof item['avatar'] !== 'undefined' && item['avatar']) ? (<img className="logo" src={item['avatar']} alt=""></img>):''}
                <h4>{item['title']}</h4>
                <div className="clear"></div>
                {(typeof item['subtitle'] !== 'undefined' && item['subtitle']) ? (<span className="bold">{item['subtitle']}<br></br></span>):''}
                {(typeof item['date'] !== 'undefined' && item['date']) ? (<span>{item['date']}</span>):''}
                {(typeof item['label'] !== 'undefined' && item['label']) ? (<span className="bold success">{item['label']}</span>):''}
                {(typeof item['date'] !== 'undefined' || item['label'] !== undefined) ? (<div className="clear"></div>):''}
                {(typeof item['descr'] !== 'undefined' && item['descr'] && this.state.visibleCaptions[item['id']] !== undefined) ? (<div>{item['descr']}</div>):''}  
                {(item['hasChild'] || (this.state.next[item['id']] !== undefined && this.state.next[item['id']].length > 0)) ? (<span className="bold">{item['hasChild'] || this.state.next[item['id']].length} child</span>):''} 
                {(linkText !== '') ? (<a href={item['link']['url']} target="_blank" rel="noopener noreferrer" className="link">{linkText}</a>):''}
            </div>
        ):null
    }

    renderList(items) {
        let hasNodes = false;
        let list = items.map((item) => {
            var node = this.renderItem(item)
            if (node) hasNodes = true;
            return (node) ? (
                <li key={item['id']}>
                    {node}
                    {(typeof item['children'] == 'object' && item['children'] && item['children'].length) ? this.renderList(item['children']):''}
                </li>
            ):null
        })
        return (hasNodes) ? (
            <ul>
                {list}
            </ul>
        ):null
    }

    render() {
        return (
            <div className="org-chart tf-tree">
                {this.renderList(this.props.tree)}
            </div>
        )
    }
}

OrgChart.propTypes = {
    tree: PropTypes.array,
    collapse: PropTypes.bool,
    onExpandItem: PropTypes.func
  };

export default OrgChart;