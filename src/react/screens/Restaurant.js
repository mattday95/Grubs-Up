import React, {Component} from 'react';
import axios from 'axios';
import {AiFillStar, AiFillInfoCircle, AiFillHeart} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import {BsSearch} from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { RiEBikeFill } from 'react-icons/ri';
import { BiShoppingBag } from 'react-icons/bi';

import DiscountTag from '../components/DiscountTag';

import Header from '../objects/Header';

export default class Restaurant extends Component {

    constructor(props){
        super(props);
        this.state = {
            menu: []
        }
    }

    componentDidMount() {

        const URL = 'http://juicy-gossip.grubs-up.local/api/consumer/menus?id=134';

        axios.get(URL)
            .then(res => {
                const data = res.data;
                console.log(data);
                this.setState({menu: data});
            });
    }

    render() {

        const restaurant = this.props.location.state;
        const {menu} = this.state;

        return(
            <div>
                <Header/>
                <div style={{backgroundImage: `url(${restaurant.hero_background})`}} className="o-hero-restaurant">
                    <div className="grid-container">
                        <div className="grid-x">
                            <div className="medium-1">
                                <div className="o-hero-restaurant__logo">
                                    <img src={restaurant.logo}/>
                                </div>
                            </div>
                            <div className="medium-7">
                                <div className="o-hero-restaurant__meta grid-x">
                                    <div className="cell grid-x u-align-x--center">
                                        <h1>{restaurant.name}</h1>
                                        {
                                            restaurant.discount.rate > 0 &&
                                            <DiscountTag style="inline" minimum_spend={restaurant.discount.minimum_spend} rate={restaurant.discount.rate}/>
                                        }
                                    </div>
                                    <div className="cell">
                                        <ul className="grid-x o-hero-restaurant__meta__list">
                                            <li className="grid-y cell medium-2">
                                                <div className="cell">
                                                    <AiFillStar/>
                                                    <span className="meta-value">{restaurant.reviews.average_rating}</span>
                                                </div>
                                                <div className="cell">
                                                    <span className="meta-description">{`${restaurant.reviews.num_reviews} ${restaurant.reviews.num_reviews > 1 || restaurant.reviews.num_reviews === 0 ? 'Reviews' : 'Review'}`}</span>
                                                </div>
                                            </li>
                                            <li className="grid-y cell medium-2">
                                                <div className="cell">
                                                    <MdLocationOn/>
                                                    <span className="meta-value">{restaurant.distance} miles</span>
                                                </div>
                                                <div className="cell">
                                                    <span className="meta-description">Distance From</span>
                                                </div>
                                            </li>
                                            <li className="grid-y cell medium-2">
                                                <div className="cell">
                                                    <BiShoppingBag/>
                                                    <span className="meta-value">{restaurant.collection_available ? `${restaurant.times.collection} mins` : 'Closed'}</span>
                                                </div>
                                                <div className="cell">
                                                    <span className="meta-description">Collection Time</span>
                                                </div>
                                            </li>
                                            <li className="grid-y cell medium-2">
                                                <div className="cell">
                                                    <RiEBikeFill/>
                                                    <span className="meta-value">{restaurant.delivery_available ? `${restaurant.times.delivery} mins` : 'Closed'}</span>
                                                </div>
                                                <div className="cell">
                                                    <span className="meta-description">Delivery Time</span>
                                                </div>
                                            </li>
                                            {   
                                                restaurant.delivery.charge && restaurant.delivery_available &&
                                                <li className="grid-y cell medium-2">
                                                    <div className="cell">
                                                        <span className="meta-value">{parseInt(restaurant.delivery.charge) > 0 ? `Delivery: £${restaurant.delivery.charge}` : 'Delivery: Free'}</span>
                                                    </div>
                                                    {
                                                        parseInt(restaurant.delivery.minimum_spend) > 0 &&
                                                        <div className="cell">
                                                            <span className="meta-description">Min: £{restaurant.delivery.minimum_spend}</span>
                                                        </div>
                                                    }
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="medium-4">
                                <div className="o-hero-restaurant__actions">
                                    <ul className="o-hero-restaurant__actions__link-list">
                                        <li>
                                            <Link>
                                                <AiFillStar/>
                                                <span>Review ({restaurant.reviews.num_reviews})</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link>
                                                <AiFillInfoCircle/>
                                                <span>View Info</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link>
                                                <AiFillHeart/>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid-container">
                    <div className="grid-x grid-margin-x u-align-x--top">
                        <div className="cell medium-3 o-category-list">
                            <h3>Items</h3>
                            <ul className="o-category-list__list">
                                <li><a href="#">Pizza</a></li>
                                <li><a href="#">Calzone</a></li>
                                <li><a href="#">Garlic Bread</a></li>
                                <li><a href="#">Kebabs</a></li>
                                <li><a href="#">Burgers</a></li>
                                <li><a href="#">Parmesans</a></li>
                                <li><a href="#">Wraps</a></li>
                                <li><a href="#">Sides</a></li>
                                <li><a href="#">Icecream</a></li>
                                <li><a href="#">Drinks</a></li>
                            </ul>
                        </div>
                        <div className="cell medium-5 o-product-list">
                            <div className="o-product-list__search">
                                <div className="c-search">
                                    <input onChange={(e) => this.setState({ restaurantSearch : e.target.value})} type="text" placeholder="Search Takeaways"/>
                                    <BsSearch size='14px'/>
                                </div>
                            </div>
                            {
                                menu.map(productGroup => {

                                const subgroups = productGroup.subgroups;

                                return(

                                    <div className="c-product-group">
                                        <div className="c-product-group__header">
                                            <span>{productGroup.group_title}</span>
                                        </div>
                                        {
                                            subgroups.map(subgroup => {

                                            const products = subgroup.products;

                                            return(

                                                <div className="c-product-group__sub-cat">
                                                    <div className="c-product-group__sub-cat__header">
                                                        <span>{subgroup.subgroup_title}</span>
                                                        <p>{subgroup.subgroup_description}</p>
                                                    </div>
                                                    {
                                                        products.map(product => {

                                                            return(

                                                                <div className="c-product-list-item">
                                                                    <div className="c-product-list-item__details">
                                                                        <h4 className="product-title">{product.post_title}</h4>
                                                                        <p className="product-description">4pcs strips, 5pcs bites, 15pcs popcorn chicken, 1 fries, coleslaw, garlic mayo and pepsi can</p>
                                                                    </div>
                                                                    <span className="c-product-list-item__price">£7.50</span>
                                                                    <div className="c-product-list-item__add-to-cart">
                                                                        <div className="c-add-to-cart">
                                                                            <span>Add</span>
                                                                            <span>+</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                            )

                                                            
                                                        })
                                                    }
                                                    
                                                </div>
                                            )


                                            })
                                        }
                            
                                    </div> 

                                )


                                })
                            }  
                        </div>
                        <div className="cell medium-4 o-basket">
                            <h3>Basket</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}