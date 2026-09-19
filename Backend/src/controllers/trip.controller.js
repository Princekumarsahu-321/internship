import Propety from '../models/property.model.js';
import {planTrip} from '../ai/tripPlanner.js';
 
const cleanCity=(text)=> text.toLowerCase().replace(" ", "");

const createTripPlan = async (req, res) => {
    try{
        const {destination, budget, days, people, interests} = req.body;

        if(!destination || !budget || !days || !people || !interests){
            return res.status(400).json({
                status:"fail", 
                message: "All fields are required"
            });
        }
        const plan=await planTrip({
            destination,
            budget, 
            days,
            people,
            interests : interests || []
        });

        const perNight=Number(budget)/Number(days);
        const city=cleanCity(destination);
        const properties=await Propety.find({
            $or:[
                {"address.city": city},
                {"address.state": city},
                {"address.area": city}         
            ],
            price:{$lte: perNight},
            maximumGuest:{$gte: Number(people)},
        }).limit(6);

        res.status(200).json({
            status:"success",
            data: {plan, properties, perNight}
        });

    }catch(error){
        res.status(500).json({
            status:"fail",
            message: "Error creating trip", error
        });
    }
}

const writeDescription = async (req, res) => {
    try{
        const description=await writeTripDescription(req.body);
        res.status(200).json({
            status:"success",
            data: {description}
        });
    }catch(error){
        res.status(500).json({
            status:"fail",
            message: "Error writing description", error
        });
    }
}

export {createTripPlan, writeDescription};
