const AddingNotification = ({message}) => {
    const addingStyle = {
        color:'pink',
        fontSize:22
    }

    if (message===null) {
        return null
    }

    return (
        <div style={addingStyle}>{message} </div>
    )
}

export default AddingNotification