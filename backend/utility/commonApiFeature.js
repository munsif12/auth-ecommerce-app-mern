class ApiFeatures {
  constructor(model, query) {
    this.model = model;
    this.queryParams = query;
    this.query = null;
  }
  filtration() {
    try {
      const { sort, fields, page, limit, ...restQuery } = this.queryParams;
      this.query = JSON.stringify(restQuery);
      const addDollerSign = this.query.replace(
        /\b(gt|lt|lte|gte|in|all)\b/g,
        (match) => `$${match}`
      );
      this.query = userDetails.find(JSON.parse(addDollerSign));
      return this;
    } catch (error) {
      return error;
    }
  }
  sort() {
    if (this.queryParams.sort) {
      const sortOn = this.queryParams.sort.split(",").join(" "); //working ParamsComming as ( name,age ) with comma we have to remove them now .split => [ name , age].join(" ") ==> result (name age)  here we removed the comma becoz for sorting and selecting the query is model.select("name agr")
      this.query = this.query.sort(sortOn); //still not resolving the promise here bcoz we have one more method to chain which is .select for selecting required firlds
    } else {
      this.query = this.query.sort("createdAt"); //still not resolving the promise here bcoz we have one more method to chain which is .select for selecting required firlds
    }
    return this;
  }
  fieldLimitation() {
    if (this.queryParams.fields) {
      // console.log(fileds);
      const fieldsConToStr = this.queryParams.fields.split(",").join(" "); //working ParamsComming as ( name,age ) with comma we have to remove them now .split => [ name , age].join(" ") ==> result (name age)  here we removed the comma becoz for sorting and selecting the query is model.select("name agr")
      this.query = this.query.select(fieldsConToStr);
      // console.log(await user);
    }
    return this;
  }
  pagination() {
    const reqLimit = this.queryParams.limit || 2;
    const reqPage = this.queryParams.page || 1;
    const skipValues = (reqPage - 1) * reqLimit;
    this.query = this.query.skip(skipValues).limit(Number(reqLimit));
    return this;
  }
  get() {
    return this.query;
  }
}
module.exports = ApiFeatures;
