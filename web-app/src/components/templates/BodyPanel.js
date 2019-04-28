import React, { Component } from 'react';
import AvailableTimes from 'react-available-times';

class BodyPanel extends Component {
    constructor(props) {
        super(props);
        this.props.getBookings();
        this.state = { appointments: this.props.appointments }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ appointments: nextProps.appointments });
    }

    render() {

        const appointments = this.state.appointments.map(({ date_booking, time_booking }) => {
            const d = date_booking.split("T")[0];
            return ({ start: new Date(d + 'T10:00:00'), end: new Date(d + 'T11:00:00') })
        });

        return (
            <div>
                <section class="content-header">
                    <h1>My Tasks <small> Calendar show the appointment you have got</small></h1>
                    <ol class="breadcrumb">
                        <li><a><i class="fa fa-dashboard"></i> Home</a></li>
                        <li class="active">Calendar</li>
                    </ol>
                </section>
                <section class="content">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="box box-primary">
                                <div class="box-body no-padding">
                                    <div id="calendar">
                                        {appointments.length > 0 ?
                                            <AvailableTimes
                                                weekStartsOn="monday"
                                                calendars={calenders}
                                                onChange={(selections) => {
                                                    selections.forEach(({ start, end }) => {
                                                        console.log('Start:', start, 'End:', end);
                                                    })
                                                }}
                                                initialSelections={appointments}
                                                height={500}
                                                recurring={false}
                                                availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}
                                                availableHourRange={{ start: 6, end: 21 }}
                                            /> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>);
    }
}

const calenders = [
    {
        id: 'plumbing',
        title: 'Plumbing',
        foregroundColor: '#ff00ff',
        backgroundColor: '#f0f0f0',
        selected: true,
    },
    {
        id: 'vehicle_service',
        title: 'Vehicle service',
        foregroundColor: '#666',
        backgroundColor: '#f3f3f3',
    },
]

export default BodyPanel;
