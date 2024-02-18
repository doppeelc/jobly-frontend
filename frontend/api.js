import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `http://${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      const message = err.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of companies by search */

  static async searchCompanies(search) {
    let url = search ? `companies?name=${search}` : "companies";
    let res = await this.request(url)
    return res.companies;
  }

  /** Get details on a job by id */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Get a list of jobs by search */

  static async searchJobs(title) {
    let url = title ? `jobs?title=${title}` : "jobs";
    let res = await this.request(url)
    return res.jobs;
  }

  /** Creates an account from user information */

  static async signup(user) {
    let res = await this.request(`auth/register`, user, "post");
    this.token = res.token;
    return res.token;
  }

  /** Login using username and password */

  static async login(username, password) {
    let res = await this.request(`auth/token`, {username, password}, "post");
    this.token = res.token;
    return res.token;
  }

  /** Gets current users information */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Updates information of user */

  static async updateUser(updatedInfo) {
    const { username, firstName, lastName, email } = updatedInfo;
    let res = await this.request(`users/${username}`, {firstName, lastName, email}, "patch");
    return res.user;
  }

  /** Applies user for job */

  static async applyForJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.applied;
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
//JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI" +
//                 "6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE" +
//                 "1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;