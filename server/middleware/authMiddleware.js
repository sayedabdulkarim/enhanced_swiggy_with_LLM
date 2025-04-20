import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import cookie from "cookie"; // add this
//parser
import UserModal from "../modals/userModal.js";
import AdminUserModal from "../modals/admin/adminSingupModal.js";

export const protectedRoutes = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Assuming you have a User model where you can find the user by ID
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// module.exports = protectedRoutes;

// export const protectedRoutesWithParser = asyncHandler(
//   async (req, res, next) => {
//     // console.log(req, " from top");
//     const token = req.cookies.jwt; // 'jwt' is the cookie name you've set
//     // console.log(token, " ttoken");
//     if (token) {
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // console.log(decoded, " ddddeee");
//         // console.log(req, " reqqqq");
//         // Populate req.user
//         req.user = await UserModal.findById(decoded.id).select("-password");

//         next();
//       } catch (error) {
//         console.error(error);
//         res.status(401);
//         throw new Error("Not authorized, token failed");
//       }
//     } else {
//       res.status(401);
//       throw new Error("Not authorized, no token");
//     }
//   }
// );

export const protectedRoutesWithParser = asyncHandler(
  async (req, res, next) => {
    const token = req.cookies.jwt; // JWT token from cookie
    const csrfToken = req.cookies["XSRF-TOKEN"]; // CSRF token from cookie
    // const csrfTokenFromHeader = req.headers["X-CSRF-TOKEN"]; // CSRF token from header
    const csrfTokenFromHeader = req.headers["x-csrf-token"]; // CSRF token from header

    // console.log({ token, csrfToken, csrfTokenFromHeader, req: req.headers });

    if (token && csrfToken && csrfTokenFromHeader) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verify CSRF token
        if (csrfToken !== csrfTokenFromHeader) {
          res.status(403);
          throw new Error("CSRF token validation failed");
        }

        // Token is valid, set the user in the request
        req.user = await UserModal.findById(decoded.id).select("-password");
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, token missing or CSRF token missing");
    }
  }
);

//one withCSRF
// export const protectedAdminRoutesWithParser = asyncHandler(
//   async (req, res, next) => {
//     const token = req.cookies.admin_jwt; // JWT token from cookie
//     const csrfToken = req.cookies["admin_XSRF-TOKEN"]; // CSRF token from cookie
//     // const csrfTokenFromHeader = req.headers["X-CSRF-TOKEN"]; // CSRF token from header
//     const csrfTokenFromHeader = req.headers["x-csrf-token"]; // CSRF token from header

//     // console.log({ token, csrfToken, csrfTokenFromHeader });

//     if (token && csrfToken && csrfTokenFromHeader) {
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // Verify CSRF token
//         if (csrfToken !== csrfTokenFromHeader) {
//           res.status(403);
//           throw new Error("CSRF token validation failed");
//         }

//         // Token is valid, set the user in the request
//         req.adminuser = await AdminUserModal.findById(decoded.id).select(
//           "-password"
//         );
//         // console.log(req.adminuser, " req.adminuser");
//         // const data = await AdminUserModal.findById(decoded.id).select(
//         //   "-password"
//         // );
//         // console.log({ data, decoded }, " dddddddddddd");
//         next();
//       } catch (error) {
//         console.error(error);
//         res.status(401);
//         throw new Error("Not authorized, token failed");
//       }
//     } else {
//       res.status(401);
//       throw new Error("Not authorized, token missing or CSRF token missing");
//     }
//   }
// );

//wit JWT / no CSRF
export const protectedAdminRoutesWithParser = asyncHandler(
  async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Assuming you have a User model where you can find the user by ID
        req.adminuser = await AdminUserModal.findById(decoded.id).select(
          "-password"
        );

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
// module.exports = protectedRoutes;
