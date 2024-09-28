import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';



const HomeScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [posts, setPosts] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://ip:3000/get-posts");
      // Ensure the response data is an array
      if (Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        setPosts([]); // Fallback to an empty array if the response isn't as expected
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
      setPosts([]); // Set to empty array on error
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `http://ip:3000/posts/${postId}/${userId}/like`
      );
      const updatedPost = response.data;

      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error liking the post", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await axios.put(
        `http://ip:3000/posts/${postId}/${userId}/unlike`
      );
      const updatedPost = response.data;

      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  return (

    <ScrollView style={{ marginTop: 50, flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          style={{ width: 60, height: 70, resizeMode: "contain" }}
          source={require('./tech.png')}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <View
              key={post._id}
              style={{
                padding: 15,
                borderColor: "#D0D0D0",
                borderTopWidth: 1,
                flexDirection: "row",
                gap: 10,
                marginVertical: 10,
              }}
            >
              <View>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    resizeMode: "contain",
                  }}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                  }}
                />
              </View>

              <View>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}
                >
                  {post?.user?.name}
                </Text>
                <Text>{post?.content}</Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 15,
                  }}
                >
                  {post?.likes?.includes(userId) ? (
                    <AntDesign
                      onPress={() => handleDislike(post?._id)}
                      name="heart"
                      size={18}
                      color="red"
                    />
                  ) : (
                    <AntDesign
                      onPress={() => handleLike(post?._id)}
                      name="hearto"
                      size={18}
                      color="black"
                    />
                  )}

                  <FontAwesome name="comment-o" size={18} color="black" />

                  <Ionicons
                    name="share-social-outline"
                    size={18}
                    color="black"
                  />
                </View>

                <Text style={{ marginTop: 7, color: "gray" }}>
                  {post?.likes?.length} likes • {post?.replies?.length} reply
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={{textAlign:"center",paddingTop:200 }}>No posts</Text>
        )}
      </View>
    </ScrollView>
   
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
