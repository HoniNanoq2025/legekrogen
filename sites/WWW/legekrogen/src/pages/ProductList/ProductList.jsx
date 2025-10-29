import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import {
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../api/products.js";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  //Modal state
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Er du sikker på, at du vil slette dette produkt?")) {
      try {
        await deleteProduct(id);
        // Henter produkter igen efter sletning
        const data = await getProducts();
        setProducts(data);
        toast.success("Produktet blev slettet ✅");
      } catch (err) {
        setError(err.message);
        toast.error("Der opstod en fejl under sletning ❌");
      }
    }
  };

  const handleEditClick = async (id) => {
    try {
      const product = await getProductById(id);
      setEditingProduct(product);
      setOpenModal(true);
    } catch {
      toast.error("Kunne ikke hente produktet ❌");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProduct(editingProduct.id, editingProduct);
      toast.success("Produkt opdateret ✅");
      setOpenModal(false);
      const data = await getProducts();
      setProducts(data);
    } catch {
      toast.error("Fejl ved opdatering ❌");
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h1" color="primary">
            Produkter
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={() => navigate("/products/import")}
            >
              Importér
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/products/new")}
            >
              Nyt Produkt
            </Button>
          </Box>
        </Box>

        <TextField
          fullWidth
          placeholder="Søg efter produkter..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 3 }}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
      </Box>

      {filteredProducts.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h3" color="text.secondary" gutterBottom>
            Ingen produkter fundet
          </Typography>
          <Typography color="text.secondary" mb={3}>
            {searchTerm
              ? "Prøv at justere din søgning"
              : "Kom i gang ved at oprette et nyt produkt"}
          </Typography>
          {!searchTerm && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/products/new")}
            >
              Opret Produkt
            </Button>
          )}
        </Box>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {filteredProducts.map((product) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={product.id}
                sx={{
                  minWidth: { xs: "100%", sm: 368 },
                  maxWidth: { xs: "100%", sm: 368 },
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 250,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    {product.image && (
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{ width: "100%", height: 200, objectFit: "cover" }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h3" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Typography variant="h3" color="primary">
                          {product.price} kr.
                        </Typography>
                        <Chip
                          label={product.inStock ? "På lager" : "Udsolgt"}
                          color={product.inStock ? "success" : "error"}
                          size="small"
                        />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                  <Box display="flex" gap={1} justifyContent="flex-end" p={1}>
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(product.id);
                      }}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product.id);
                      }}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
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
                  />
                  <TextField
                    label="Beskrivelse"
                    multiline
                    rows={3}
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
              <Button
                onClick={handleSave}
                variant="contained"
                disabled={saving}
              >
                {saving ? <CircularProgress size={24} /> : "Gem"}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
}
