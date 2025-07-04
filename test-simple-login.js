async function testLogin() {
  const credentials = {
    username: "admin",
    password: "struktura2024",
  }

  try {
    console.log("🧪 Testing login API...")
    console.log("Credentials:", credentials)

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    console.log("Response status:", response.status)

    const data = await response.json()
    console.log("Response data:", data)

    if (response.ok && data.success) {
      console.log("✅ Login test PASSED")
      console.log("User:", data.user)
    } else {
      console.log("❌ Login test FAILED")
      console.log("Error:", data.error)
    }
  } catch (error) {
    console.error("❌ Test error:", error)
  }
}

// Run test if this file is executed directly
if (typeof window === "undefined") {
  testLogin()
}
