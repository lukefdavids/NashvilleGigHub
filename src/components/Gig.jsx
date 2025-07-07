// export const Gig = ({ gig }) => {
//   const formatDateTime = (isoString) => {
//     const date = new Date(isoString);

//     const formattedDate = date.toLocaleDateString("en-US", {
//       month: "2-digit",
//       day: "2-digit",
//       year: "numeric",
//     });

//     let formattedTime = date
//       .toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "2-digit",
//         hour12: true,
//       })
//       .toLowerCase();

//     formattedTime = formattedTime.replace(/\s/g, "");

//     return { formattedDate, formattedTime };
//   };

//   return (
//     <article className="gig" key={gig.id}>
//       <div className="gig-left">
//         <div>
//           <h3>{gig.artist?.name}</h3>
//         </div>
//         <div>
//           <img
//             className="artist-img"
//             src={gig.artist.image}
//             alt={gig.artist.name}
//           />
//         </div>
//         <div className="links">
//           <img src="src/img/Instagram_logo.png" alt="Instagram logo" />
//           <img
//             className="spotify-img"
//             src="src/img/Spotify_logo.png"
//             alt="Spotify logo"
//           />
//           <img src="src/img/Facebook_logo.png" alt="Facebook logo" />
//           <img
//             className="website-img"
//             src="src/img/website_logo.jpg"
//             alt="Generic Website logo"
//           />
//         </div>
//       </div>
//       <div className="gig-right">
//         <div className="date">
//           {formatDateTime(gig.dateTime).formattedDate} @ {gig.name}
//         </div>
//         <div className="gig-info">
//           <p>Where: {gig.address}</p>
//           <p>When: {formatDateTime(gig.dateTime).formattedTime}</p>
//           <p>How much: {gig.cost}</p>
//           <p>Ages: {gig.ages}</p>
//         </div>
//       </div>
//     </article>
//   );
// };
