import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { createProduct } from "../../api/products.js";

export default function ProductCreate() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      toast.error("Navn og pris er påkrævet!");
      return;
    }

    setLoading(true);
    try {
      await createProduct({
        name,
        price: Number(price),
        description,
        image,
      });
      toast.success("Produkt oprettet ✅");
      navigate("/"); // Tilbage til produktlisten
    } catch {
      console.error(err);
      toast.error("Fejl ved oprettelse af produkt ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h1" color="primary" gutterBottom>
          Nyt Produkt
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}
        >
          <TextField
            label="Produkt Navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Pris"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            slotProps={{
              input: {
                sx: {
                  /* Chrome, Edge, Safari */
                  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  /* Firefox */
                  "&[type=number]": {
                    MozAppearance: "textfield",
                  },
                },
              },
            }}
          />
          <TextField
            label="Beskrivelse"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Billede (URL)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Opret Produkt"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Tilbage
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
}
