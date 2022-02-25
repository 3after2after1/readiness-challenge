
import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

// import { Autocomplete } from "@mui/material"

// export default function SearchBar({data, placeholder}) {
//     return (
//       <div className="search">
//         <div className="searchInput">
//           <Autocomplete 
//           id="custom-input-demo"
//           options={data}
//           getOptionLabel={(opt) => opt.title}

//           renderInput={(params) => (
//               <div ref={params.InputProps.ref}>
//                   <input type="text" {...params.inputProps} placeholder={placeholder} autoFocus='true' />
//               </div>
//           )}
//           >
//           </Autocomplete>
//         </div>
//       </div>
//     );
// }
