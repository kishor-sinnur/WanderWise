const Joi = require('joi');
const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(2000),
        image: Joi.string().allow("", null),
        Category:Joi.string().required(),
    }).required()
});

const reviewSchema = Joi.object({
    review: Joi.object({
      ratings: Joi.number().required(),
      Comment: Joi.string().required()
    }).required()
  });

module.exports={
    listingSchema,
    reviewSchema
}