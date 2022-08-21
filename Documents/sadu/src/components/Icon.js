import React from 'react'
import { Icon } from "@react-native-material/core";

export default function AppIcon({ name, size, color='#6c00eb' }) {
    return (
        <Icon
            name={name}
            size={size}
            color={color} />
    )
}
