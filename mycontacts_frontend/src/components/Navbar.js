
function Navbar() {
    return (
      <div className="Nav">
        <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">Contact Manager</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a href="sass.html">Add Contact</a></li>
              <li><a href="badges.html">update </a></li>
              <li><a href="collapsible.html">remove</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
  
  export default Navbar;