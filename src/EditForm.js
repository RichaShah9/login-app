import React, { Component } from 'react'
import { Button, Segment, Grid, Header, Form } from 'semantic-ui-react'
import Service from './service';

export default class EditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            fixedPhone: '',
            partnerCategory: '',
            emailAddress: '',
            partnerAddressList: [36, 28],
            category: [],
            addressList: [],
            adlist: [
                { id: '' },
            ]
        }
        this.service = new Service();
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSelection = (e) => this.setState({ partnerCategory: e.target.value });
    handleAddressSelection = (e) => {
        const partnerAddressList = [];
        const options = e.target.options;
        const adlist = [];

        console.log(options);
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                const result = partnerAddressList.findIndex(address => address.id === options[i].value)
                if (result === -1) {
                    partnerAddressList.push(options[i].value);
                    console.log(partnerAddressList);
                }
            }
        }
        this.setState({ partnerAddressList });

        for (let i = 0; i < partnerAddressList.length; i++) {
            adlist.push({ id: partnerAddressList[i] });
        }
        this.setState({ adlist });
        console.log("adlist ", adlist)
    }

    search() {
        this.service.getData('com.axelor.apps.base.db.PartnerAddress').then(res =>
            res.json().then(result => {
                const { data } = result;
                this.setState((prevState) => {
                    return { addressList: data };
                });
            })
        );
    }

    searchCategory() {
        this.service.getData('com.axelor.apps.base.db.PartnerCategory').then(res =>
            res.json().then(result => {
                const { data } = result;
                this.setState((prevState) => {
                    return { category: data };
                });
            })
        );
    }

    handleCustomer(e) {
        e.preventDefault();
        const formPayload = {
            name: this.state.name,
            fullName: this.state.name,
            fixedPhone: this.state.fixedPhone,
            partnerCategory: { id: this.state.partnerCategory },
            emailAddress: { address: this.state.emailAddress },
            isCustomer: true,
            partnerAddressList: this.state.adlist
        };
        if (this.state.id === undefined) {
            this.service.add('com.axelor.apps.base.db.Partner', formPayload).then(res => console.log(res));
        }
        else {
            formPayload['version'] = this.state.version;
            this.service.update('com.axelor.apps.base.db.Partner', formPayload, this.props.location.state.data.id).then(res => {
                res.json().then(result => {
                    const { data } = result;
                    if (data && data.length) {
                        const record = data[0];
                        this.setState({
                            id: record.id,
                            name: record.name,
                            fixedPhone: record.fixedPhone,
                            partnerCategory: record.partnerCategory.id,
                            emailAddress: record.emailAddress && record.emailAddress.name,
                            version: record.version,
                            partnerAddressList: record.partnerAddressList
                        });
                    }
                })
            });
            console.log('form data: ', formPayload);
        }
    }

    componentDidMount() {
        if (this.props.location.state.data.id !== undefined) {
            this.setState({
                id: this.props.location.state.data.id,
                name: this.props.location.state.data.name,
                fixedPhone: this.props.location.state.data.fixedPhone,
                partnerCategory: this.props.location.state.data.partnerCategory && this.props.location.state.data.partnerCategory.id,
                emailAddress: this.props.location.state.data.emailAddress && this.props.location.state.data.emailAddress.name,
                version: this.props.location.state.data.version,
            })

            const partnerAddressList = []
            this.props.location.state.data.partnerAddressList.forEach(address => {
                partnerAddressList.push(address.id);
                this.setState({
                    partnerAddressList
                })
            });
        }
    }

    handleBack(e) {
        e.preventDefault();
        this.props.history.push('/welcome/employeedata');
    }

    render() {
        return (
            <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'>
                <Grid.Column style={{ marginTop: 150, marginLeft: 50, marginRight: 50 }}>
                    <Header as='h2' icon color='teal' textAlign='center'>
                        <Header.Content>
                            ADD/UPDATE CUSTOMER
                        </Header.Content>
                    </Header>
                    <Form onSubmit={(e) => this.handleCustomer(e)}>
                        <Segment raised>
                            <Form.Input
                                label='Full Name'
                                placeholder='Full name'
                                required
                                name='name'
                                value={this.state.name}
                                onChange={this.handleChange} />

                            <Form.Input label='Fixed Phone'
                                placeholder='Fixed Phone'
                                name='fixedPhone'
                                value={this.state.fixedPhone}
                                onChange={this.handleChange} />

                            <b><label>Category</label></b>
                            <select
                                onFocus={() => this.searchCategory()}
                                onChange={this.handleSelection}
                                value={this.state.partnerCategory}
                                placeholder="Select category">
                                {this.state.category.map((option) =>
                                    <option value={option.id} key={option.id}> {option.name}</option>
                                )}
                            </select>
                            <br />

                            <b><label>Address</label></b>
                            <select
                                onFocus={() => this.search()}
                                onChange={this.handleAddressSelection}
                                value={this.state.partnerAddressList}
                                placeholder="Select category"
                                multiple>
                                {this.state.addressList.map((option) =>
                                    <option value={option.id} key={option.id}> {option.address.fullName}</option>
                                )}
                            </select>
                            <br />

                            <Form.Input label='Email Address'
                                placeholder='Email Address'
                                name='emailAddress'
                                value={this.state.emailAddress}
                                onChange={this.handleChange} />

                            <Button type='submit'>Submit</Button>
                            <Button onClick={(e) => this.handleBack(e)}>Back</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}
