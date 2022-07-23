<script>
  let firstname = "",
    lastname = "",
    email = "",
    password = "";

  const submit = async () => {
    var details = {
      firstname,
      lastname,
      email,
      password,
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch("http://localhost:4000/api/inventory/registrations", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.metadata.http_code == "201") {
          alert("berhasil daftar");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
</script>

<div class="content">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <img src="undraw_remotely_2j6y.svg" alt="Avatar" class="img-fluid" />
      </div>
      <div class="col-md-6 contents">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="mb-4">
              <h3>Sign Up</h3>
              <p class="mb-4">
                Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                consectetur adipisicing.
              </p>
            </div>
            <form on:submit|preventDefault={submit}>
              <div class="form-group first">
                <label for="username">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  bind:value={firstname}
                />
              </div>
              <div class="form-group">
                <label for="username">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  bind:value={lastname}
                />
              </div>
              <div class="form-group">
                <label for="username">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  bind:value={email}
                />
              </div>
              <div class="form-group last mb-4">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  bind:value={password}
                />
              </div>

              <input
                type="submit"
                value="Sign Up"
                class="btn btn-block btn-primary"
              />

              <span class="d-block text-left my-4 text-muted text-center"
                >&mdash; Sudah Punya Akun? <a
                  href="/login"
                  style="text-decoration: none;">Login</a
                > &mdash;</span
              >
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
