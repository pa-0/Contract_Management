import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import React, { useState } from 'react'
import Slide from "@mui/material/Slide";
import CustomFormLabel from '@/ReusableComponets/forms/CustomElements/CustomFormLabel';
import CustomTextField from '@/ReusableComponets/forms/CustomElements/CustomTextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ShareMedia({ shareto, setshareto , getList, onshare }) {
    const [shareList, setshareList] = useState([]);
    const optionList = getList(shareto.shareto);
    return (
        <>
            {shareto.open && <Dialog
                open={shareto.open}
                TransitionComponent={Transition}
                keepMounted
                PaperProps={{
                    style: { borderRadius: "20px", padding: "10px" },
                }}
                maxWidth="sm"
                fullWidth="sm"
            >
                <DialogTitle sx={{ fontSize: "18px" }}>Share</DialogTitle>
                <Divider />
                <DialogContent>
                    <CustomFormLabel sx={{ mt: 1 }} htmlFor="Name">
                        {shareto.shareto}
                    </CustomFormLabel>
                    <Autocomplete
                        multiple
                        size="small"
                        limitTags={2}
                        id="tags-outlined"
                        options={optionList}
                        getOptionLabel={(option) => option.label}
                        value={shareList}
                        isOptionEqualToValue={(option, value) =>
                            option.label === value.label
                        }
                        fullWidth
                        onChange={(event, value) => setshareList(value)}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <CustomTextField
                                {...params}
                                size="small"
                                margin="dense"
                                autoFocus
                                aria-label="products"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </DialogContent>

                <DialogActions>
                    <Button color="primary" onClick={() => {setshareList([]);setshareto({ open: false, shareto: "", media: null })}}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="secondary" onClick={()=>{ setshareList([]); setshareto({ open: false, shareto: "", media: null }) ;onshare(shareto.media,shareList)}}>
                        share
                    </Button>
                </DialogActions>
            </Dialog>}
        </>
    )
}

export default ShareMedia