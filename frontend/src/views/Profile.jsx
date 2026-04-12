const Profile = () => {
  return (
    <>
      <section className="profile-container">
        {/*-- USER INFO -->*/}
        <div className="profile-card">
          <div className="profile-photo"></div>

          <div className="profile-info">
            <h2 className="profile-name">John Smith</h2>
            <p className="profile-email">john@example.com</p>
            <p className="profile-phone">+358 40 123 4567</p>

            <button className="edit-btn">Edit Profile</button>
          </div>
        </div>

        {/*-- EVENTS -->*/}
        <div className="section-block">
          <h3 className="section-title">My Events</h3>
          <ul className="list">
            <li>26.01 - 01.02 — Italian Week</li>
            <li>28.01 — Chef’s Special Day</li>
            <li>30.01 — Wine Tasting</li>
          </ul>
          <button className="action-btn">Add Event</button>
        </div>

        {/*-- RESERVATIONS -->*/}
        <div className="section-block">
          <h3 className="section-title">My Reservations</h3>
          <ul className="list">
            <li>
              Table for 2 — 28.01 — 19:00 <span className="cancel">Cancel</span>
            </li>
            <li>
              Table for 4 — 30.01 — 18:30 <span className="cancel">Cancel</span>
            </li>
          </ul>
        </div>

        {/*-- GIFT CARD -->*/}
        <div className="section-block">
          <h3 className="section-title">Gift Card</h3>
          <p>Buy a gift card for your friends or family.</p>
          <button className="action-btn">Buy Gift Card</button>
        </div>

        {/*-- RECIPE OF THE DAY -->*/}
        <div className="section-block">
          <h3 className="section-title">Recipe of the Day</h3>

          <div className="recipe-card">
            <div className="recipe-img"></div>
            <h4>Tomato Basil Pasta</h4>
            <p>Fresh tomatoes, basil, garlic and olive oil.</p>
            <button className="action-btn">Save to Notes</button>
          </div>
        </div>

        {/*-- NOTES -->*/}
        <div className="section-block">
          <h3 className="section-title">My Notes</h3>

          <textarea
            className="notes-area"
            placeholder="Write your notes here..."
          ></textarea>

          <div className="notes-actions">
            <button className="notes-btn save-btn">Save</button>
            <button className="notes-btn view-btn">View Notes</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
