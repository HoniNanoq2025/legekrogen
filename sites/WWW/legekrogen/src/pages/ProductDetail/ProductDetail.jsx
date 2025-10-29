import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../api/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError("Kunne ikke hente produktet");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleEditClick = () => {
    setEditingProduct(product);
    setOpenModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateProduct(editingProduct.id, editingProduct);
      toast.success("Produkt opdateret ✅");
      setProduct(updated);
      setOpenModal(false);
    } catch {
      toast.error("Fejl ved opdatering ❌");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Er du sikker på, at du vil slette dette produkt?")) {
      try {
        await deleteProduct(product.id);
        toast.success("Produkt slettet ✅");
        navigate("/");
      } catch {
        toast.error("Fejl ved sletning ❌");
      }
    }
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h3" color="error">
          {error}
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Tilbage
        </Button>
      </Box>
    );

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          {product.image && (
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{ height: 300, objectFit: "cover" }}
            />
          )}
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h2">{product.name}</Typography>
              <Chip
                label={product.inStock ? "På lager" : "Udsolgt"}
                color={product.inStock ? "success" : "error"}
                size="small"
              />
            </Box>
            <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
              {product.price} kr.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {product.description}
            </Typography>
            <Box display="flex" gap={2} mt={3}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEditClick}
              >
                Rediger
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Slet
              </Button>
              <Button variant="text" onClick={() => navigate("/")}>
                Tilbage
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Rediger Produkt</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            {editingProduct && (
              <>
                <TextField
                  label="Produkt Navn"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Pris"
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Beskrivelse"
                  multiline
                  rows={4}
                  value={editingProduct.description || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Billede (URL)"
                  value={editingProduct.image || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      image: e.target.value,
                    })
                  }
                  fullWidth
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} disabled={saving}>
              Annullér
            </Button>
            <Button onClick={handleSave} variant="contained" disabled={saving}>
              {saving ? <CircularProgress size={24} /> : "Gem"}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
}
