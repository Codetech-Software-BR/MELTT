import { List, ListItem, ListItemIcon, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

const ListItemStudent = ({icon, title, state }: {icon: ReactNode, title: string, state: any}) => {
  return (
    <List>
      <ListItem disablePadding sx={{px: 3}}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <Stack direction={"column"}>
          <Typography fontWeight={700} fontSize={12}>
            {title}
          </Typography>
          <Stack direction={"column"} gap={2} sx={{fontSize: 14}}>
            {state}
          </Stack>
        </Stack>
      </ListItem>
    </List>
  );
};

export default ListItemStudent;
