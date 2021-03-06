<!--
Copyright (C) 2016
Emmanuel ROECKER and Rym BOUCHAGOUR
http://dev.glicer.com

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; version 2 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
-->

<autologin>
  <div id="dropdown" class="dropdown pull-right">
    <a class="dropdown-toggle" data-toggle="dropdown" role="button">
      <span id="dropdownicon" class="glyphicon glyphicon-lock text-danger"></span>
    </a>
    <div class="dropdown-menu">
      <form>
        <div class="form-group">
          <label for="password" class="sr-only">Mot de passe</label>
          <input id="password" onkeydown={keydown} class="form-control" type="password" placeholder="Mot de passe"></input>
        </div>
        <span id="message" class="text-danger"></span>
        <button type="button" class="btn btn-default btn-block" onclick={login}>Connexion</button>
      </form>
    </div>
  </div>

  <style scoped>
    .dropdown-menu {
      padding: 5px;
    }

  </style>

  <script>
    'use strict';

    autologin() {
      if (!autologin.setMasterPassword(this.password.value)) {
        this.message.textContent = 'Bad password';
      } else {
        this.dropdownicon.classList.remove('text-danger');
        this.dropdown.classList.remove('open');
      }
      this.password.value = "";
    }

    keydown(e) {
      this.message.textContent = '';
      if (e.which !== 13) {
        return true;
      }
      this.autologin();
      return false;
    }

    login(e) {
      this.autologin();
    }
  </script>
</autologin>
