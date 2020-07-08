{
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
            <span className="gx-link" onClick={()=>{
                this.setState({
                    eid : text.id,
                    editbutton: true,
                    fetchdata : [{
                        id:text.id,
                        name:text.name,
                        description:text.description,
                    }]
                })
            }}>Edit</span>
            <Divider type="vertical"/>
            <span className="gx-link" onClick={() => {
                this.setState({
                    warning: true,
                    idvalue: text.id
                })
            }}>Delete</span>
        </span>
    ),
}

// button add and editbutton
