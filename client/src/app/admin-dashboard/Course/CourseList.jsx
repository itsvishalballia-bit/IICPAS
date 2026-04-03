"use client";

import React, { useEffect, useState, forwardRef } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "@/contexts/AuthContext";

const MySwal = withReactContent(Swal);
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

const CourseList = forwardRef(
  (
    {
      onAddCourse,
      onEditCourse,
      onAddChapter,
      onDeleteCourse,
      onToggleStatus,
      onManageLevels,
      onGroupPricing,
    },
    ref
  ) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const { hasPermission } = useAuth();

    const statusColors = {
      Active: "success",
      Inactive: "error",
    };

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE}/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        MySwal.fire("Error!", "Failed to fetch courses", "error");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchCourses();
    }, []);

    // Expose fetchCourses to parent component
    React.useImperativeHandle(ref, () => ({
      fetchCourses,
    }));

    const filteredCourses = courses.filter((course) => {
      const query = search.trim().toLowerCase();
      if (!query) return true;
      return (
        course.title?.toLowerCase().includes(query) ||
        course.category?.toLowerCase().includes(query) ||
        course.level?.toLowerCase().includes(query) ||
        course.status?.toLowerCase().includes(query)
      );
    });

    const activeCount = courses.filter((course) => course.status === "Active").length;
    const categoryCount = new Set(courses.map((course) => course.category).filter(Boolean)).size;

    const handleToggleStatus = async (course) => {
      try {
        await axios.put(`${API_BASE}/courses/${course._id}/toggle-status`);
        await onToggleStatus(course);
        fetchCourses();
      } catch (error) {
        console.error("Error toggling status:", error);
        MySwal.fire("Error!", "Failed to toggle status", "error");
      }
    };

    return (
      <Box sx={{ height: "auto", overflow: "visible" }}>
        <Box
          sx={{
            mb: 3,
            overflow: "hidden",
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,0.7)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(239,246,255,0.86) 45%, rgba(236,253,245,0.82) 100%)",
            p: { xs: 2.5, md: 3 },
            boxShadow: "0 24px 70px -42px rgba(15,23,42,0.35)",
          }}
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            alignItems={{ xs: "stretch", lg: "center" }}
            justifyContent="space-between"
            spacing={2.5}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{ color: "#0f172a", letterSpacing: "-0.03em" }}
              >
                Course Management
              </Typography>
              <Typography sx={{ mt: 1, color: "#475569", maxWidth: 680 }}>
                Manage course catalog, pricing structure, and chapter setup in a
                dashboard that feels closer to the public website.
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ width: { xs: "100%", lg: "auto" } }}
            >
              {hasPermission("course", "add") && (
                <Button
                  variant="outlined"
                  onClick={onManageLevels}
                  sx={{
                    borderColor: "rgba(37,99,235,0.28)",
                    color: "#2563eb",
                    borderRadius: "18px",
                    px: 3,
                    py: 1.2,
                    fontWeight: 700,
                    textTransform: "none",
                    backgroundColor: "rgba(255,255,255,0.65)",
                    "&:hover": {
                      borderColor: "#2563eb",
                      backgroundColor: "#eff6ff",
                    },
                  }}
                >
                  Manage Levels
                </Button>
              )}
              {hasPermission("course", "add") && (
                <Button
                  variant="outlined"
                  onClick={onGroupPricing}
                  sx={{
                    borderColor: "rgba(15,159,110,0.35)",
                    color: "#0f9f6e",
                    borderRadius: "18px",
                    px: 3,
                    py: 1.2,
                    fontWeight: 700,
                    textTransform: "none",
                    backgroundColor: "rgba(255,255,255,0.65)",
                    "&:hover": {
                      borderColor: "#0f9f6e",
                      backgroundColor: "#ecfdf5",
                    },
                  }}
                >
                  Group Pricing
                </Button>
              )}
              {hasPermission("course", "add") && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={onAddCourse}
                  sx={{
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #1d4ed8 55%, #0f9f6e 100%)",
                    borderRadius: "18px",
                    px: 3.25,
                    py: 1.2,
                    fontWeight: 800,
                    textTransform: "none",
                    boxShadow: "0 20px 35px -24px rgba(37,99,235,0.9)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #1d4ed8 0%, #1e40af 55%, #0b8f63 100%)",
                      boxShadow: "0 24px 38px -24px rgba(29,78,216,0.95)",
                    },
                  }}
                >
                  Add Course
                </Button>
              )}
            </Stack>
          </Stack>

          <Stack
            direction={{ xs: "column", xl: "row" }}
            spacing={2}
            sx={{ mt: 3 }}
          >
            <Box
              sx={{
                flex: 1.2,
                borderRadius: "22px",
                border: "1px solid rgba(255,255,255,0.8)",
                backgroundColor: "rgba(255,255,255,0.78)",
                px: 2,
                py: 1.2,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by course, category, level, or status"
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "0.98rem",
                  color: "#0f172a",
                }}
              />
            </Box>

            <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
              <Box
                sx={{
                  minWidth: 140,
                  borderRadius: "22px",
                  border: "1px solid #dbeafe",
                  backgroundColor: "#eff6ff",
                  px: 2.2,
                  py: 1.5,
                }}
              >
                <Typography sx={{ fontSize: 12, color: "#2563eb", fontWeight: 700 }}>
                  Total Courses
                </Typography>
                <Typography sx={{ mt: 0.5, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>
                  {courses.length}
                </Typography>
              </Box>
              <Box
                sx={{
                  minWidth: 140,
                  borderRadius: "22px",
                  border: "1px solid #bbf7d0",
                  backgroundColor: "#ecfdf5",
                  px: 2.2,
                  py: 1.5,
                }}
              >
                <Typography sx={{ fontSize: 12, color: "#0f9f6e", fontWeight: 700 }}>
                  Active
                </Typography>
                <Typography sx={{ mt: 0.5, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>
                  {activeCount}
                </Typography>
              </Box>
              <Box
                sx={{
                  minWidth: 140,
                  borderRadius: "22px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  px: 2.2,
                  py: 1.5,
                }}
              >
                <Typography sx={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>
                  Categories
                </Typography>
                <Typography sx={{ mt: 0.5, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>
                  {categoryCount}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            bgcolor: "rgba(255,255,255,0.88)",
            borderRadius: "28px",
            boxShadow: "0 24px 70px -45px rgba(15,23,42,0.3)",
            p: { xs: 1.5, md: 2 },
            border: "1px solid rgba(255,255,255,0.7)",
            height: "auto",
            overflow: "visible",
          }}
        >
          {loading ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography>Loading courses...</Typography>
            </Box>
          ) : (
            <Box sx={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0 10px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "transparent",
                    }}
                  >
                    <th
                      style={{
                        padding: "0 20px 14px",
                        textAlign: "left",
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Category
                    </th>
                    <th
                      style={{
                        padding: "0 20px 14px",
                        textAlign: "left",
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Course Name
                    </th>
                    <th
                      style={{
                        padding: "0 20px 14px",
                        textAlign: "left",
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Level
                    </th>
                    <th
                      style={{
                        padding: "0 20px 14px",
                        textAlign: "left",
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        padding: "0 20px 14px",
                        textAlign: "left",
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr
                      key={course._id}
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.96) 100%)",
                      }}
                    >
                      <td
                        style={{
                          padding: "20px",
                          fontSize: 15,
                          borderTop: "1px solid #e2e8f0",
                          borderBottom: "1px solid #e2e8f0",
                          borderLeft: "1px solid #e2e8f0",
                          borderTopLeftRadius: "20px",
                          borderBottomLeftRadius: "20px",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            padding: "8px 12px",
                            borderRadius: "999px",
                            background: "#eff6ff",
                            color: "#2563eb",
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                        >
                          {course.category || "Uncategorized"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "20px",
                          fontSize: 15,
                          borderTop: "1px solid #e2e8f0",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: 17, color: "#0f172a" }}>
                          {course.title}
                        </div>
                        <div style={{ marginTop: 6, fontSize: 13, color: "#64748b" }}>
                          Slug: {course.slug || "Not available"}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "20px",
                          fontSize: 15,
                          borderTop: "1px solid #e2e8f0",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            padding: "8px 12px",
                            borderRadius: "999px",
                            background: "#f8fafc",
                            color: "#334155",
                            fontWeight: 600,
                            fontSize: 13,
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          {course.level || "Not set"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "20px",
                          fontSize: 15,
                          borderTop: "1px solid #e2e8f0",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        <Chip
                          label={course.status}
                          color={statusColors[course.status] || "default"}
                          variant="outlined"
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.78rem",
                            borderRadius: "999px",
                            px: 0.8,
                            backgroundColor:
                              course.status === "Active" ? "#ecfdf5" : "#fef2f2",
                          }}
                        />
                      </td>
                      <td
                        style={{
                          padding: "20px",
                          fontSize: 15,
                          borderTop: "1px solid #e2e8f0",
                          borderBottom: "1px solid #e2e8f0",
                          borderRight: "1px solid #e2e8f0",
                          borderTopRightRadius: "20px",
                          borderBottomRightRadius: "20px",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          {hasPermission("course", "read") && (
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<AddIcon />}
                              onClick={() => onAddChapter(course)}
                              sx={{
                                px: 2.2,
                                py: 0.8,
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                borderRadius: "999px",
                                textTransform: "none",
                                background:
                                  "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                boxShadow:
                                  "0 12px 24px -18px rgba(37,99,235,0.85)",
                                height: 36,
                                minWidth: "auto",
                                "&:hover": {
                                  background:
                                    "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                                },
                              }}
                            >
                              Chapters
                            </Button>
                          )}

                          {hasPermission("course", "update") && (
                            <Tooltip title="Edit Course" arrow>
                              <IconButton
                                size="small"
                                onClick={() => onEditCourse(course)}
                                sx={{
                                  bgcolor: "#eff6ff",
                                  color: "#2563eb",
                                  border: "1px solid #dbeafe",
                                  "&:hover": {
                                    bgcolor: "#dbeafe",
                                  },
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}

                          {hasPermission("course", "read") && (
                            <Tooltip title="View Course" arrow>
                              <IconButton
                                size="small"
                                onClick={() => onEditCourse(course)}
                                sx={{
                                  bgcolor: "#ecfdf5",
                                  color: "#0f9f6e",
                                  border: "1px solid #bbf7d0",
                                  "&:hover": {
                                    bgcolor: "#d1fae5",
                                  },
                                }}
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}

                          {hasPermission("course", "delete") && (
                            <Tooltip title="Delete Course" arrow>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  onDeleteCourse(course, fetchCourses)
                                }
                                sx={{
                                  bgcolor: "#fef2f2",
                                  color: "#dc2626",
                                  border: "1px solid #fecaca",
                                  "&:hover": {
                                    bgcolor: "#fee2e2",
                                  },
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack>
                      </td>
                    </tr>
                  ))}
                  {!loading && filteredCourses.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          padding: "36px 20px",
                          textAlign: "center",
                          color: "#64748b",
                          fontSize: 15,
                        }}
                      >
                        No courses matched your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
);

export default CourseList;
