import React, { useEffect, useState } from 'react';
import './home.css';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BorderClearIcon from '@mui/icons-material/BorderClear';
import SellIcon from '@mui/icons-material/Sell';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import TodayIcon from '@mui/icons-material/Today';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import olmazor from '../../assets/images/index.jpeg';
import xonsaroy from '../../assets/images/xonsaroy.jpg';
import index from '../../assets/images/olmazor.jpeg';
const steps = ['Check your order', 'Submit order'];

const Home = () => {
    const [companyId, setCompanyId] = useState('');
    const [complexId, setComplexId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [bankId, setBankId] = useState('');
    const [duration, setDuration] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    //data
    const [fcompany, setFcompany] = useState([]);
    const [fcomplex, setFcomplex] = useState([]);
    const [frooms, setFrooms] = useState([]);
    const [fbanks, setFbanks] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        fetch('https://exammonth9.herokuapp.com/company')
            .then((res) => res.json())
            .then((data) => setFcompany(data));
    }, []);

    useEffect(() => {
        if (companyId) {
            fetch('https://exammonth9.herokuapp.com/complex', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    id: companyId,
                },
            })
                .then((res) => res.json())
                .then((data) => setFcomplex(data))
                .catch((err) => console.log(err));
        }
    }, [companyId]);

    useEffect(() => {
        if (complexId) {
            fetch('https://exammonth9.herokuapp.com/rooms', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    id: complexId,
                },
            })
                .then((res) => res.json())
                .then((data) => setFrooms(data))
                .catch((err) => console.log(err));
        }
    }, [complexId]);

    useEffect(() => {
        if (roomId) {
            const sum =
                frooms.find((e) => e.roomid === roomId).square *
                frooms.find((e) => e.roomid === roomId).price;
            fetch('https://exammonth9.herokuapp.com/banks', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    sum,
                },
            })
                .then((res) => res.json())
                .then((data) => setFbanks(data));
        }
    }, [roomId, frooms]);

    const changeCompany = (e) => {
        setCompanyId(e.target.value);
        document.querySelectorAll('select')[1].value =
            document.querySelectorAll('select')[1][0].value;
        setComplexId('');
        document.querySelectorAll('select')[2].value =
            document.querySelectorAll('select')[2][0].value;
        setRoomId('');
        setFrooms([]);
        document.querySelectorAll('select')[3].value =
            document.querySelectorAll('select')[3][0].value;
        setBankId('');
        setFbanks([]);
        document.querySelectorAll('select')[4].value =
            document.querySelectorAll('select')[4][0].value;
        setDuration('');
    };
    const changeComplex = (e) => {
        setComplexId(e.target.value);
        document.querySelectorAll('select')[2].value =
            document.querySelectorAll('select')[2][0].value;
        setRoomId('');
        setFrooms([]);
        document.querySelectorAll('select')[3].value =
            document.querySelectorAll('select')[3][0].value;
        setBankId('');
        setFbanks([]);
        document.querySelectorAll('select')[4].value =
            document.querySelectorAll('select')[4][0].value;
        setDuration('');
    };
    const changeRoom = (e) => {
        setRoomId(e.target.value);
        document.querySelectorAll('select')[3].value =
            document.querySelectorAll('select')[3][0].value;
        setBankId('');
        setFbanks([]);
        document.querySelectorAll('select')[4].value =
            document.querySelectorAll('select')[4][0].value;
        setDuration('');
    };
    const changeBank = (e) => {
        setBankId(e.target.value);
        document.querySelectorAll('select')[4].value =
            document.querySelectorAll('select')[4][0].value;
        setDuration('');
    };
    const checkOrder = async () => {
        if (companyId && complexId && roomId && bankId && duration) {
            setOpen(true);
            await fetch('https://exammonth9.herokuapp.com/order', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    companyid: companyId,
                    complexid: complexId,
                    roomid: roomId,
                    bankid: bankId,
                    duration,
                },
            })
                .then((res) => res.json())
                .then((data) => setOrder(data));
            setName('');
            setPhone('');
        } else {
            alert('The selections are not fully filled');
        }
    };

    //modal
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
    };

    //stepper
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (document.getElementById('btn').textContent === 'Next') {
            document.getElementById('info').classList.add('d-none');
            document.getElementById('form').classList.remove('d-none');
            document.getElementById('btn').textContent = 'Submit';
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else if (document.getElementById('btn').textContent === 'Submit') {
            if (name && phone) {
                fetch('https://exammonth9.herokuapp.com/order', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({
                        name,
                        phone,
                        paymentduration: duration,
                        spayment: order[0].spayment,
                        mpayment: order[0].mpayment,
                        bankid: bankId,
                        companyid: companyId,
                        complexid: complexId,
                        roomid: roomId,
                    }),
                })
                    .then((res) => res)
                    .then((data) => data);

                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                document.querySelectorAll('select')[0].value =
                    document.querySelectorAll('select')[0][0].value;
                setCompanyId('');
                document.querySelectorAll('select')[1].value =
                    document.querySelectorAll('select')[1][0].value;
                setComplexId('');
                setFcomplex([]);
                document.querySelectorAll('select')[2].value =
                    document.querySelectorAll('select')[2][0].value;
                setRoomId('');
                setFrooms([]);
                document.querySelectorAll('select')[3].value =
                    document.querySelectorAll('select')[3][0].value;
                setBankId('');
                setFbanks([]);
                document.querySelectorAll('select')[4].value =
                    document.querySelectorAll('select')[4][0].value;
                setDuration('');
            } else {
                alert('The inputs are not fully filled');
            }
        }
    };

    const handleBack = () => {
        document.getElementById('info').classList.remove('d-none');
        document.getElementById('form').classList.add('d-none');
        document.getElementById('btn').textContent = 'Next';
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setOpen(false);
        setTimeout(() => {
            setActiveStep(0);
        }, 1000);
    };

return (
        <div>
            <form className="form pt-5 container">
                <select
                    style={{ width: '280px', height:'50px' }}
                    className=" inputselect form-select me-5"
                    onChange={changeCompany}
                    defaultValue={'company'}
                    required
                >
                    <option value="company" disabled>
                        company
                    </option>
                    {fcompany &&
                        fcompany.map((e, i) => (
                            <option key={i} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                </select>

                <select
                    style={{ width: '320px',height:'50px' }}
                    className=" inputselect form-select me-5"
                    onChange={changeComplex}
                    defaultValue={'complex'}
                    required
                >
                    <option value="complex" disabled>
                        complex
                    </option>
                    {fcomplex &&
                        fcomplex.map((e, i) => (
                            <option key={i} value={e.complexid}>
                                {e.name}
                            </option>
                        ))}
                </select>

                <select
                    style={{ width: '130px', height:'50px' }}
                    className="inputselect form-select me-5"
                    onChange={changeRoom}
                    defaultValue={'rooms'}
                    required
                >
                    <option value="rooms" disabled>
                        rooms
                    </option>
                    {frooms &&
                        frooms.map((e, i) => (
                            <option key={i} value={e.roomid}>
                                {e.count}
                            </option>
                        ))}
                </select>

                <select
                    style={{ width: '200px',height:'50px' }}
                    className="inputselect form-select me-5"
                    onChange={changeBank}
                    defaultValue={'banks'}
                >
                    <option value="banks" disabled>
                        banks
                    </option>
                    {fbanks &&
                        fbanks.map((e, i) => (
                            <option key={i} value={e.bankid}>
                                {e.bank + ' ' + e.services + '%'}
                            </option>
                        ))}
                </select>

                <select
                    style={{ width: '150px', height:'50px' }}
                    className=" inputselect form-select me-5"
                    defaultValue={'duration'}
                    onChange={(e) => setDuration(e.target.value)}
                >
                    <option value="duration" disabled>
                        duration
                    </option>
                    <option value={10}>10 year</option>
                    <option value={15}>15 year</option>
                    <option value={20}>20 year</option>
                </select>

                <div
								className="check" 
								style={{ height: '100%' }} >
                    <Button 
												className="checkbtn"
                        variant="outlined"
                        onClick={checkOrder}
                        style={{ backgroundColor: '#0275d8', color: '#ffffff' }}>
                        CHECK
                    </Button>
                    <Dialog
                    style={{ width:'100%'}}
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title">
                        <DialogContent style={{ width: '500px', height:'600px', marginRight:'50px' }}>
                            <div>
                                <Box sx={{ width: '500px' }}>
                                    <Stepper activeStep={activeStep}>
                                        {steps.map((label) =>  {
                                            const stepProps = {};
                                            const labelProps = {};
                                            return (
                                                <Step
                                                    key={label}
                                                    {...stepProps}
                                                >
                                                    <StepLabel {...labelProps}>
                                                        {label}
                                                    </StepLabel>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                    { activeStep === steps.length ? (
                                        <React.Fragment>
                                            <Typography sx={{ mt: 2, mb: 1 }}>
                                                Your request has been accepted
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    pt: 2,
                                                }}
                                            >
                                                <Box
                                                    sx={{ flex: '1 1 auto' }}
                                                />
                                                <Button onClick={handleReset}>
                                                    Close
                                                </Button>
                                            </Box>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <div sx={{ mt: 2, mb: 1 }}>
                                                <span id="info">
                                                    {order &&
                                                        order.map((e, i) => (
                                                            <span key={i} >
                                                                <span className="d-flex modalwidth">
                                                                    <span className="text text-dark fs-4">
                                                                        <BusinessIcon color="primary" />{' '}
                                                                        Company:{' '}
                                                                    </span>
                                                                    <span className="fs-5">
                                                                        {
                                                                            e.company
                                                                        }
                                                                    </span>
                                                                </span>
                                                                <span className="d-block modalwidth">
                                                                    <span className="text text-dark fs-4">
                                                                        <HomeWorkIcon color="primary" />{' '}
                                                                        Complex:{' '}
                                                                    </span>
                                                                    <span className="fs-5">
                                                                        {
                                                                            e.complex
                                                                        }
                                                                    </span>
                                                                </span>
                                                                <span className="d-block modalwidth">
                                                                    <span className="text text-dark fs-4">
                                                                        <MeetingRoomIcon color="primary" />{' '}
                                                                        Room:{' '}
                                                                    </span>
                                                                    <span className="fs-5">
                                                                        {e.room}
                                                                    </span>
                                                                </span>
                                                                <span className="d-block modalwidth">
                                                                    <span className="text text-dark fs-4">
                                                                        <BorderClearIcon color="primary" />{' '}
                                                                        Square:{' '}
                                                                    </span>
                                                                    <span className="fs-5">
                                                                        {
                                                                            e.square
                                                                        }{' '}
                                                                        m
                                                                        <sup>
                                                                            2
                                                                        </sup>
                                                                    </span>
                                                                </span>
                                                                <span className="d-block modalwidth">
                                                                    <span className="text text-dark fs-4">
                                                                        <MonetizationOnIcon color="primary" />{' '}
                                                                        1 m
                                                                        <sup>
                                                                            2
                                                                        </sup>
                                                                        :{' '}
                                                                    </span>
                                                                    <span className="fs-5">
                                                                        {
                                                                            e.price
                                                                        }
                                                                    </span>
                                                                </span>
                                                                <span className="d-block modalwidth">
                                                                    <span className="text text-dark fs-4">
                                                                        <SellIcon color="primary" />{' '}
                                                                        Home
                                                                        price:{' '}
                                                                    </span>
                                                                    <span className="fs-5">
                                                                        {
                                                                            e.allprice
                                                                        }{' '}
                                                                        sum
                                                                    </span>
                                                                </span>
                                                                <span className="d-block modalwidth">
                                                                    <span className='modalwidth'>
                                                                        <span className="text text-dark fs-4">
                                                                            <AccountBalanceIcon color="primary" />{' '}
                                                                            Bank:{' '}
                                                                        </span>
                                                                        <span className="fs-5 me-3">
                                                                            {
                                                                                e.bank
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                    <span className='modalwidth'>
                                                                        <span className="text text-dark fs-4">
                                                                            <DesignServicesIcon color="primary" />{' '}
                                                                            Service:{' '}
                                                                        </span>
                                                                        <span className="fs-5">
                                                                            {
                                                                                e.service
                                                                            }
                                                                            %
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                                <span className="d-block modalwidth">
                                                                    <span className="text text-dark fs-4">
                                                                        <CreditScoreIcon color="primary" />{' '}
                                                                        Starting
                                                                        Payment:{' '}
                                                                    </span>
                                                                    <span className="fs-5">
                                                                        {
                                                                            e.spayment
                                                                        }{' '}
                                                                        sum
                                                                    </span>
                                                                </span>
                                                                <span className="d-block modalwidth">
                                                                    <span className="text text-dark fs-4">
                                                                        <TodayIcon color="primary" />{' '}
                                                                        Monthly
                                                                        Payment:{' '}
                                                                    </span>
                                                                    <span className="fs-5">
                                                                        {
                                                                            e.mpayment
                                                                        }{' '}
                                                                        sum
                                                                    </span>
                                                                </span>
                                                                <span className="d-block modalwidth">
                                                                    <span className="text text-dark fs-4">
                                                                        <ShutterSpeedIcon color="primary" />{' '}
                                                                        Payment
                                                                        Duration:{' '}
                                                                    </span>
                                                                    <span className="fs-5">
                                                                        {
                                                                            duration
                                                                        }{' '}
                                                                        year
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        ))}
                                                </span>
                                                <span
                                                    id="form"
                                                    className="d-none"
                                                >
                                                    <div className="d-flex justify-content-center">
                                                        <input
                                                            onChange={(e) =>
                                                                setName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            id="phone"
                                                            className="inputmodal form-control mt-3"
                                                            type="text"
                                                            placeholder="Name"
                                                        />
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        <input 
                                                            onChange={(e) =>
                                                                setPhone(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            id="tel"
                                                            className="inputmodal form-control mt-2"
                                                            type="tel"
                                                            placeholder="Phone"
                                                        />
                                                    </div>
                                                </span>
                                            </div>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    pt: 2,
                                                }}
                                            >
                                                <Button
                                                    color="inherit"
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                                <Box
                                                    sx={{ flex: '1 1 auto' }}
                                                />

                                                <Button
                                                    id="btn"
                                                    onClick={handleNext}
                                                >
                                                    Next
                                                </Button>
                                            </Box>
                                        </React.Fragment>
                                    )}
                                </Box>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </form>
            <div
                style={{
                    width: '1200px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
                id="carouselExampleIndicators"
                className="carousel slide mt-5 "
                data-bs-ride="carousel"
            >
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={0}
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    />
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={1}
                        aria-label="Slide 2"
                    />
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={2}
                        aria-label="Slide 3"
                    />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src={xonsaroy}
                            className="d-block w-100"
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img src={index} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={olmazor}
                            className="d-block w-50"
                            alt="..."
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Home;
