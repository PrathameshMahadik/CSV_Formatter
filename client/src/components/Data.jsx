// import React, { useCallback, useEffect, useState } from "react";
// import Box from "@mui/joy/Box";
// import Avatar from "@mui/joy/Avatar";
// import Chip from "@mui/joy/Chip";
// import Link from "@mui/joy/Link";
// import Divider from "@mui/joy/Divider";
// import IconButton from "@mui/joy/IconButton";
// import Typography from "@mui/joy/Typography";
// import List from "@mui/joy/List";
// import ListItem from "@mui/joy/ListItem";
// import ListItemContent from "@mui/joy/ListItemContent";
// import ListItemDecorator from "@mui/joy/ListItemDecorator";
// import ListDivider from "@mui/joy/ListDivider";
// import Menu from "@mui/joy/Menu";
// import MenuButton from "@mui/joy/MenuButton";
// import MenuItem from "@mui/joy/MenuItem";
// import Dropdown from "@mui/joy/Dropdown";
// import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
// import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
// import BlockIcon from "@mui/icons-material/Block";
// import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import axios from "axios";

// function RowMenu() {
//   return (
//     <Dropdown>
//       <MenuButton
//         slots={{ root: IconButton }}
//         slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
//       >
//         <MoreHorizRoundedIcon />
//       </MenuButton>
//       <Menu size="sm" sx={{ minWidth: 140 }}>
//         <MenuItem>Edit</MenuItem>
//         <MenuItem color="danger">Delete</MenuItem>
//       </Menu>
//     </Dropdown>
//   );
// }

// export default function Data() {
//   const [data,setData] = useState([])
//   const [page,setPage] = useState(1)
//   const [limit,setLimit] = useState(10)
//   console.log("🚀 ~ Data ~ limit:", limit)


//   const fetchData = useCallback(async()=>{
//     try{
//       const response = await axios.get(`http://localhost:4999/data?_limit=${limit}&_page=${page}`)
//       setData(response.data.data)
//       console.log("🚀 ~ fetchData ~ response:", response)
//     }catch(error){
//     console.log("🚀 ~ fetchData ~ error:", error)
//     }
//   },[page,limit])
  
//   useEffect(() => {
//     fetchData()
//   }, [])
  
  
//   return (
//     <Box sx={{ display: { xs: "block", sm: "none" } }}>
//       {data.map((listItem) => (
//         <List
//           key={listItem.id}
//           size="sm"
//           sx={{
//             "--ListItem-paddingX": 0,
//           }}
//         >
//           <ListItem
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "start",
//             }}
//           >
//             <ListItemContent
//               sx={{ display: "flex", gap: 2, alignItems: "start" }}
//             >
//               <ListItemDecorator>
//                 <Avatar size="sm">{listItem.customer.initial}</Avatar>
//               </ListItemDecorator>
//               <div>
//                 <Typography fontWeight={600} gutterBottom>
//                   {listItem.customer.name}
//                 </Typography>
//                 <Typography level="body-xs" gutterBottom>
//                   {listItem.customer.email}
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     gap: 0.5,
//                     mb: 1,
//                   }}
//                 >
//                   <Typography level="body-xs">{listItem.date}</Typography>
//                   <Typography level="body-xs">&bull;</Typography>
//                   <Typography level="body-xs">{listItem.id}</Typography>
//                 </Box>
//                 <Box
//                   sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
//                 >
//                   <Link level="body-sm" component="button">
//                     Download
//                   </Link>
//                   <RowMenu />
//                 </Box>
//               </div>
//             </ListItemContent>
//             <Chip
//               variant="soft"
//               size="sm"
//               startDecorator={
//                 {
//                   Paid: <CheckRoundedIcon />,
//                   Refunded: <AutorenewRoundedIcon />,
//                   Cancelled: <BlockIcon />,
//                 }[listItem.status]
//               }
//               color={
//                 {
//                   Paid: "success",
//                   Refunded: "neutral",
//                   Cancelled: "danger",
//                 }[listItem.status]
//               }
//             >
//               {listItem.status}
//             </Chip>
//           </ListItem>
//           <ListDivider />
//         </List>
//       ))}
//       <Box
//         className="Pagination-mobile"
//         sx={{
//           display: { xs: "flex", md: "none" },
//           alignItems: "center",
//           py: 2,
//         }}
//       >
//         <IconButton
//           aria-label="previous page"
//           variant="outlined"
//           color="neutral"
//           size="sm"
//         >
//           <KeyboardArrowLeftIcon />
//         </IconButton>
//         <Typography level="body-sm" mx="auto">
//           Page 1 of 10
//         </Typography>
//         <IconButton
//           aria-label="next page"
//           variant="outlined"
//           color="neutral"
//           size="sm"
//         >
//           <KeyboardArrowRightIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// }
