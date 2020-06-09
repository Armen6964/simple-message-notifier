import React from 'react';
import io from 'socket.io-client';
import "./App.css"
import img from './notifications.png';
const socket = io('https://localhost:8020');
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ip:"192.168.0.15",
            tz:"+4",
            sender : "",
            title : "",
            message : "",
            isConnected : false,
            socketId : "",
            recipients:[],
            deliveryDate:null,
            typeId:0,
            users : [
                {
                    clientId:1,
                    name : "Grigor ",
                    surname :"Ghazaryan",
                    status:0,
                    push_web: "e8kWcM6-oMdH7C-zachXTa:APA91bHfFMkGrXazkxDry5yNdeNHSOzx6eJ5zqBBGXjd09tLFw7d53pCOM3RPk_R_hbLFeRm1AOnGKKeIcqmQxNSC4KDNu38RPnsmckrmGCbHLvpKinnSKa-GHGYoWsBHJBdfPfJAFfy",
                    push_android: "",
                    push_ios: "",
                    push_windows: "",
                    push_macOS: "",
                    emails: "grigor@inorain.com",
                    phone_number: "+37494511116",
                },
                {
                    clientId:2,
                    name : "Hovsep",
                    surname :"Vardanyan",
                    status:0,
                    push_web: "fFkh5nh-GrDgEzsudkQMq8:APA91bHt1ccLgdQexa3-rqWJfNFw5MmIWG1Vcd_YMUohnMSLHJvf0r-EDocyPFm57xK8scEVYN9eJCt6qGhRJ3nUeWodwV-hEg2QuQUy6k3qrx6kwcdXH-pCvseMsyunn55ydC09Y6rO",
                    push_android: "",
                    push_ios: "",
                    push_windows: "",
                    push_macOS: "",
                    emails: "hoso.vardanyan95@gmail.com",
                    phone_number: "+37493192920",
                },
                {
                    clientId:6,
                    name : "Armen",
                    surname :"Hakobyan",
                    status:0,
                    push_web: "dW5mSGcenkTIO4u-yUfasB:APA91bHHMhQh6DVjMiBCZzozZnS13VsbRdzpQta1cq7OPG5vocKPbn1FyRN0wLXjdewteNOAmGlfkBbQPldYsmjXD7XiqL0-fGtUoDEf9KKsufmMwPBBb3gxKqklru31m3apNodK5I5z",
                    push_android: "",
                    push_ios: "",
                    push_windows: "",
                    push_macOS: "",
                    emails: "grigor@inorain.com",
                    phone_number: "+37498041171",
                },

            ],
            types:[
                {id:0,name:"Choose Notification type"},
                {id:1,name:"immediately"},
                {id:2,name:"after"},
                {id:3,name:"day"},
                {id:4,name:"month"},
                {id:5,name:"year"},
            ],
        }
    }

    addTask(){
        let date = null;
        if (this.state.sender.length < 1){ alert("sender name is required");return;}

        if (this.state.title.length < 1){ alert("title is required"); return;}

        if (this.state.message.length < 1){ alert("message is required"); return;}

        if (this.state.deliveryDate === null){
            date = "2000-10-10 00:00:00"
        }else{
            date = this.state.deliveryDate.split("T").join(" ")+":00";
        }

        if (this.state.typeId === 0){ alert("Type required");return;}

        if (this.state.recipients.length < 1){alert("No end users to send message"); return;}

        let data = "" +
            "sender="+this.state.sender+"&" +
            "tz="+window.encodeURIComponent(this.state.tz)+"&" +
            "ip="+this.state.ip+"&" +
            "message="+this.state.message+"&" +
            "keyStorage={}&" +
            "deliveryDate="+date+"&" +
            "schedulingTypeId="+this.state.typeId+"&" +
            "title="+this.state.title+"&" +
            "recipients="+JSON.stringify(this.state.recipients);

        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) { console.log(this.responseText); }
        });
        xhr.open("POST", "https://192.168.1.170:8020/add");
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    componentDidMount() {

        socket.on("connect",(data)=>{
            socket.emit("join",{
                id:1000,
                name : "Armen",
                surname : "Hakobyan"
            })
        });

        socket.on("connected",(data)=>{
            setTimeout(()=>{
                this.setState({
                    isConnected : true,
                    socketId : socket.id
                });
            },2000)
        })

    }

    updateType(event){
        let typeId = parseInt(event.target.value);
        this.setState({
            typeId
        })
    }


    addRecipients(event){
        if (event.target.value == -1){
            return;
        }
        let elem = {...this.state.users[event.target.value]};
        console.log(elem)
        this.state.recipients.push(elem);
        this.state.users.splice(event.target.value,1);

        this.setState({
            recipients : this.state.recipients,
            users : this.state.users
        });
    }

    removeRecipients(index){
        this.state.users.push({...this.state.recipients[index]});
        this.state.recipients.splice(index,1);

        this.setState({
            recipients : this.state.recipients,
            users : this.state.users
        });

    }

    setDateValue(event){
        console.log(event.target.value);
        this.setState({
            deliveryDate : event.target.value
        })
    }

    updateMessage(event){
        this.setState({
            message : event.target.value
        })
    }

    updateTitle(event){
        this.setState({
            title : event.target.value
        })
    }

    updateSender(event){
        this.setState({
            sender : event.target.value
        })
    }

    render(){
        let status =  <h2 style={{color:"red"}}>Not Connected {this.state.socketId}</h2>;
        if (this.state.isConnected){
            status = <h2 style={{color:"green"}}>Connected {this.state.socketId}</h2>
        }

        let dateInput =  <div className="form-group col-md-6" style={{float:"right"}} >
            <label htmlFor="deliveryDate">Delivery date</label>
            <input type="datetime-local" onChange={(event)=>this.setDateValue(event)} value={this.state.deliveryDate} className="form-control" id="deliveryDate"/>
        </div>

        if (this.state.typeId === 0 || this.state.typeId === 1){ dateInput = ""; }
        return(
            <div>
                    <div className={"row"}>
                        <div className={"col-md-6"}>
                            <h1>Send notifications,emails,live messages and sms to you'r clients on mobile,web and Desktop</h1>
                            <img src={img} alt=""/>
                        </div>
                        <div style={{backgroundColor:"gray",height:"100vh"}} className={"col-md-6"}>
                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <h1>Fill the form to send notification to users</h1>
                                    <div className="form-group col-md-6" style={{float:"left"}}>
                                        <label htmlFor="sender">Who is sending?</label>
                                        <input
                                            onChange={(event)=>this.updateSender(event)}
                                            type="text"
                                            className="form-control"
                                            id="sender"/>
                                    </div>
                                    <div className="form-group col-md-6" style={{float:"right"}}>
                                        <label htmlFor="title">Title of the message</label>
                                        <input
                                               onChange={(event)=>this.updateTitle(event)}
                                               type="text"
                                               className="form-control"
                                               id="title"/>
                                    </div>
                                </div>
                            </div>



                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <div className="form-group">
                                        <label className={"marginLeftLabel1"} htmlFor="message">Message</label>
                                        <textarea value={this.state.message}
                                                  onChange={(event)=>this.updateMessage(event)}
                                                  type="text" className="form-control" id="message"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <div className="form-group col-md-6" style={{float:"left"}}>
                                        <label htmlFor="scheduling">Choose type of scheduling:</label>
                                        <select onChange={(event)=>this.updateType(event)} className="form-control" id="scheduling">
                                            {this.state.types.map((index,key)=>{
                                                return <option value={index.id}>{index.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    {dateInput}
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    {this.state.recipients.map((index,key)=>{
                                        return <div style={{background:"#ccc"}} key={key} className="column" >
                                            <h2>{index.id}</h2>
                                            <p>{index.name} {index.surname}</p>
                                            <button onClick={()=>this.removeRecipients(key)} className={"btn btn-danger"}>Remove</button>
                                        </div>
                                    })}
                                </div>
                                <label className={"marginLeftLabel"} htmlFor="recipients">Recipients:</label>
                                <select onChange={(event)=>this.addRecipients(event)} className="form-control" id="recipients">
                                    <option value={-1}>Choose user</option>
                                    {this.state.users.map((index,key)=>{
                                        return <option value={key}>{index.name} {index.surname}</option>
                                    })}
                                </select>
                            </div>


                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <div style={{textAlign: "center"}} className="form-group">
                                        <button
                                            onClick={()=>this.addTask()}
                                            style={{height:"50px"}}
                                            className={"btn btn-success"}>Send notifications</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
            </div>
        )
    }
}

export default App;
