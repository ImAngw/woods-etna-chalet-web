import React from 'react';
import menuIcon from '../assets/icons/menu.png'
import homeIcon from '../assets/icons/home.png'
import hikeIcon from '../assets/icons/hiking.png'
import closerIcon from '../assets/icons/position.png'
import bookIcon from '../assets/icons/booking.png'
import { Image, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




function MenuDropdown() {
    const navigate = useNavigate();
    return (
        <Dropdown align={"end"} className={"myFont"}>
            <Dropdown.Toggle as="div" id="dropdown-custom-toggle" style={{ cursor: 'pointer' }}>
                <img src={menuIcon} alt="Menu" width={'30px'} height={'30px'} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/')} href="#/action-1">
                    <Image  style={{height: '20px', marginRight:'10%', alignContent: 'center', cursor: 'pointer'}} src={homeIcon} />
                    Home
                </Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item onClick={() => navigate('/find_us')} href="#/action-2">
                    <Image  style={{height: '20px', marginRight:'10%', alignContent: 'center', cursor: 'pointer'}} src={hikeIcon} />
                    Our Location
                </Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item onClick={() => navigate('/services')} href="#/action-2">
                    <Image  style={{height: '20px', marginRight:'10%', alignContent: 'center', cursor: 'pointer'}} src={hikeIcon} />
                    Our Services
                </Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item onClick={() => navigate('/close_to_us')} href="#/action-3">
                    <Image  style={{height: '20px', marginRight:'10%', alignContent: 'center', cursor: 'pointer'}} src={closerIcon} />
                    Close to Us
                </Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item onClick={() => navigate('/book_page')} href="#/action-4">
                    <Image  style={{height: '20px', marginRight:'10%', alignContent: 'center', cursor: 'pointer'}} src={bookIcon} />
                    Book Now
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

    );
}

export default MenuDropdown;