<script>
  import { goto } from "@sapper/app.mjs";
  import { authenticated } from "../stores/auth";

  let email = "",
    password = "";

  const submit = async () => {
    var details = {
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

    await fetch("http://localhost:4000/api/inventory/sessions/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.metadata.http_code == "200") {
          authenticated.set(responseJson.data.access_token);
          await goto("barang");
        } else {
          alert("email atau password salah");
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
      </div>
        <div class="row justify-content-center">
            <div class="mb-4">
              <h3>Sign In</h3>
              <p class="mb-4">
                Selamat Datang Di Website Inventory
              </p>
            </div>
            <form on:submit|preventDefault={submit}>
              <div class="form-group first">
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
                value="Log In"
                class="btn btn-block btn-primary"
              />

              <span class="d-block text-left my-4 text-muted text-center"
                > Belum Punya Akun? <a href="/register" style="text-decoration: none;">Registrasi</a> </span
              >
            </form>
        </div>
    </div>
  </div>
</div>
