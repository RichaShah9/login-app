class Service {
  constructor(props) {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("X-Requested-With", "XMLHttpRequest");
    this.state = {
      baseURL: "/traversier/",
      restURL: "/traversier/ws/rest/"
    };
    this.headers = headers;
  }

  fetch(url, options) {
    return fetch(url, options);
  }

  request(url, config = {}, data = {}) {
    const options = Object.assign(
      {
        method: "POST",
        credentials: "include",
        headers: this.headers,
        mode: "cors",
        body: JSON.stringify(data)
      },
      config
    );
    if (config.method === "GET") {
      delete options.body;
    }
    return this.fetch(url, options);
  }

  login(username, password) {
    const url = `${this.state.baseURL}login.jsp`;
    const data = {
      username,
      password
    };
    const config = {
      method: "POST"
    };
    return this.logout().then(() => {
      return this.request(url, config, data);
    });
  }

  logout() {
    const url = `${this.state.baseURL}logout`;
    const config = {
      method: "GET"
    };
    return this.request(url, config);
  }

  post(url, data) {
    const config = {
      method: "POST"
    };
    return this.request(url, config, data);
  }

  put(url, data) {
    const config = {
      method: "PUT"
    };
    return this.request(url, config, data);
  }

  //insert data
  add(entity, record) {
    const data = {
      data: record
    };
    const url = `${this.state.restURL}${entity}`;
    return this.put(url, data);
  }

  //fetch data
  getData(entity, options) {
    const data = {
      limit: 140,
      offset: 0,
      ...options
    };
    const url = `${this.state.restURL}${entity}/search`;
    return this.post(url, data);
  }

  //delete
  delete(entity, id) {
    const config = {
      method: "DELETE"
    };
    const url = `${this.state.restURL}${entity}/${id}`;
    return this.request(url, config);
  }

  //update
  update(entity, record, id) {
    const data = {
      data: record
    };
    const url = `${this.state.restURL}${entity}/${id}`;
    return this.post(url, data);
  }

  //fetch single data
  getId(entity, id) {
    const url = `${this.state.restURL}${entity}/${id}/fetch`;
    return this.post(url, {});
  }
}

export default Service;
